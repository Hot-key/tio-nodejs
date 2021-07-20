export default interface TioInputData {
	Input: Array<{ Command: "V" | "F" | "R"; Payload: Record<string, Array<string> | string> }>;
}
