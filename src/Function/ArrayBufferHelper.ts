export default class ArrayBufferHelper {
	private static byteToHex: Array<string> = [];

	public static ToHex(buffer: ArrayBuffer) {
		if (this.byteToHex.length == 0) {
			for (let n = 0; n <= 0xff; ++n) {
				const hexOctet = n.toString(16).padStart(2, "0");
				this.byteToHex.push(hexOctet);
			}
		}

		const buff = new Uint8Array(buffer);
		const hexOctets = new Array(buff.length);

		for (let i = 0; i < buff.length; ++i) hexOctets.push(this.byteToHex[buff[i]]);

		return hexOctets.join("");
	}
}
