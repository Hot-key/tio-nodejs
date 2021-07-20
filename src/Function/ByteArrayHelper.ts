export default class ByteArrayHelper {
	public static ByteArrayToByteString(buffer: Uint8Array) {
		let result = "";

		buffer.forEach((byte) => {
			result += String.fromCharCode(byte);
		});

		return result;
	}
}
