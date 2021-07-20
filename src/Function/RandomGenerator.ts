import ArrayBufferHelper from "./ArrayBufferHelper";
import Crypto from "crypto";

export default class RandomGenerator {
	private static input = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!()*'";

	public static GetRandomString(length: number) {
		let result = "";

		let charactersLength = RandomGenerator.input.length;
		for (let i = 0; i < length; i++) {
			result += RandomGenerator.input.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	public static GetRandomBits(minBits: number) {
		return ArrayBufferHelper.ToHex(Crypto.randomBytes(minBits / 8).buffer);
	}
}
