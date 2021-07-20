import Pako from "pako";
import axios from "../node_modules/axios/index";
import TioInput from "./DataType/TioInput";
import Define from "./Define";
import ByteArrayHelper from "./Function/ByteArrayHelper";
import RandomGenerator from "./Function/RandomGenerator";

export default class Runner {
	public static UpdateConfig(config: { baseUrl?: string; tioRunUrl?: string }) {
		if (config.baseUrl) {
			Define.BaseUrl = config.baseUrl;
		}
		if (config.tioRunUrl) {
			Define.TioRunUrl = config.tioRunUrl;
		}
	}

	public static async Run(lang: string, code: string, input: string = "") {
		let buffer = Runner.GetBufferFromTioInput(new TioInput(lang, code, input));
		return await Runner.SendTioRequest(buffer);
	}

	public static GetBufferFromTioInput(input: TioInput): Uint8Array {
		let result = "";
		input.ToTioInputData().Input.forEach((item) => {
			result += item.Command;
			switch (item.Command) {
				case "R":
					break;
				case "F":
					{
						let key = Object.keys(item.Payload)[0];
						result += key + "\0"; // (.code.tio | .input.tio) + "\0"

						let subItem = item.Payload[key];
						if (!(subItem instanceof Array)) {
							let tempSubItemData = unescape(encodeURIComponent(subItem));
							result += tempSubItemData.length + "\0" + tempSubItemData;
						}
					}
					break;
				case "V":
					{
						let key = Object.keys(item.Payload)[0];
						result += key + "\0"; // lang + "\0"

						let subItemArray = item.Payload[key];
						if (subItemArray instanceof Array) {
							result += subItemArray.length + "\0";

							subItemArray.forEach((subItem) => {
								result += unescape(encodeURIComponent(subItem)) + "\0";
							});
						} else {
							result += 0 + "\0";
						}
					}
					break;
			}
		});

		let byteArray = new Uint8Array(result.length);
		for (let i = 0; i < result.length; i++) {
			byteArray[i] = result.charCodeAt(i);
		}

		return Pako.deflateRaw(byteArray, { level: 9 });
	}

	public static async SendTioRequest(sendBuffer: Uint8Array): Promise<Array<string>> {
		let error = "";

		try {
			let tioResult = await axios.post(`${Define.BaseUrl}${Define.TioRunUrl}/${RandomGenerator.GetRandomBits(128)}`, sendBuffer, {
				responseType: "arraybuffer",
			});
			let rawOutput = "";

			try {
				rawOutput = ByteArrayHelper.ByteArrayToByteString(Pako.inflateRaw(tioResult.data.slice(10)));
			} catch (error) {
				return ["", "Error: The server's response could not be decoded."];
			}

			let data = decodeURIComponent(escape(rawOutput));

			if (data.length < 32) {
				return ["", "Error: Could not establish or maintain a connection with the server."];
			}
			let results = data.substr(16).split(data.substr(0, 16));

			return results;
		} catch (error) {
			return ["", "Error: unknown error"];
		}
	}
}
