import Pako from "pako";
import axios from "../node_modules/axios/index";
import TioInput from "./DataType/TioInput";
import Define from "./Define";
import Runner from "./Runner";

(async () => {
	let result = await Runner.Run(
		"cs-core",
		`using System;
	class Program {
		static void Main(string[] args) {
			Console.WriteLine("Hello, World!")
		}
	}`,
	);

	console.log(result);
})();
