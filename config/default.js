"use strict";

const defaultListenPort = 3000;
const Path = require("path");

console.log("Durrab check for default.js")
const portFromEnv = () => {
  const x = parseInt(process.env.APP_SERVER_PORT || process.env.PORT, 10);
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

module.exports = {
  ui: {
    app_name: "Durrab",
    subapps: {
      deal: 'http://localhost:3001/js/_remote_~.poc_subapp.js',
      extras: 'http://localhost:3001/js/_remote_~.poc_subapp.js'
    },
  },
  connection: {
    host: process.env.HOST,
    address: process.env.HOST_IP || "0.0.0.0",
    port: portFromEnv(),
    routes: {
      cors: false,
      files: {
        relativeTo: Path.join(__dirname, '..', 'static')
      }
    },
    state: {
      ignoreErrors: true
    }
  },
  plugins: {
    "@xarc/app-dev": {
      priority: -1,
      enable:
        process.env.WEBPACK_DEV_MIDDLEWARE === "true" &&
        process.env.WEBPACK_DEV === "true"
    },
    "subapp-server": {
      enable: true
    },
  }
};
