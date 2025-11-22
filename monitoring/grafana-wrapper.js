const { spawn } = require("child_process");
const path = require("path");

const grafanaPath = path.join(__dirname,'../', "grafana", "bin", "grafana-server.exe");

// Start without opening CMD window
const child = spawn(grafanaPath, [], {
  detached: false,
  stdio: "ignore",   // hides CMD window
  windowsHide: true  // force hide on Windows
});

console.log("Grafana started in background.");

child.on("exit", (code) => {
  console.log("Grafana exited with code", code);
});
