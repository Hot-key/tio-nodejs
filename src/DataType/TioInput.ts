import TioInputData from "./TioInputData";

export default class TioInput {
	public lang: string;
	public code: string;
	public input: string;
	public args: Array<string>;

	public constructor(lang: string, code: string, input: string, args: Array<string> = []) {
		this.lang = lang;
		this.code = code;
		this.input = input;
		this.args = args;
	}

	public ToTioInputData(): TioInputData {
		let result: TioInputData = {
			Input: [
				{ Command: "V", Payload: { lang: [this.lang] } },
				{ Command: "F", Payload: { ".code.tio": this.code } },
				{ Command: "F", Payload: { ".input.tio": this.input } },
				{ Command: "V", Payload: { args: this.args } },
				{ Command: "R", Payload: {} },
			],
		};
		return result;
	}
}
