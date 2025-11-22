const { spawn } = require("child_process");
const path = require("path");

const promPath = path.join(__dirname, '../',"prometheus", "promtool.exe");

const child = spawn(promPath, [], {
  detached: false,
  stdio: "ignore",
  windowsHide: true
});

console.log("Prometheus started in background.");

child.on("exit", (code) => {
  console.log("Prometheus exited with code", code);
});
