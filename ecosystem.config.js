const path = require('path');
const isWin = process.platform === 'win32';
const ROOT = path.resolve(__dirname);

module.exports = {
  apps: [
    {
      name: "psych-api",
      script: "app.js",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env: { NODE_ENV: "development", PORT: 3010 },
      env_production: { NODE_ENV: "production", PORT: 3010 },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      restart_delay: 3000
    },
{
  name: "prometheus",
  script: "./monitoring/prom-wrapper.js",
  watch: false
},
{
  name: "grafana",
  script: "./monitoring/grafana-wrapper.js",
  watch: false
}

  ]
};
