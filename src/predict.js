const fs = require("fs");
const readline = require("readline");
const { theta0, theta1 } = JSON.parse(
	fs.readFileSync(`${__dirname}/model.json`, "utf8"),
);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.setPrompt("milage : ");
rl.prompt();

rl.on("line", (milage) => {
	const m = parseInt(milage);
	if (m === 0 || m) {
		console.log(`price : ${theta0 + theta1 * m}`);
	} else {
		console.error("Error: Invalid milage. Please type number");
	}
	rl.prompt();
});

rl.on("close", () => {
	process.exit(0);
});
