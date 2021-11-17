"use strict";

const NODE_ENV = process.env.NODE_ENV;
const isStgProd = (NODE_ENV === "production" || NODE_ENV === "staging");
// in staging/prod mode, we don't run @babel/register
// so load ES6 module support for node.js to handle amcharts4's code
require = isStgProd ? require("esm")(module) : require;

const { loadRuntimeSupport } = require("@xarc/app");
const wmlServer = require("electrode-server");
//const fastifyServer = require("@xarc/fastify-server");
const config = require("electrode-confippet").config;
const electrodeCookies = require("electrode-cookies");
const utils = require("./utils");
const { getRedirectionUrlIfRequired } = require('./utils');
const get = require('lodash/get');

async function start() {
  const supportOpts = {};
  if (!isStgProd) {
    // in dev mode, we are running @babel/register, so just tell it to transpile
    // @amcharts/amcharts4's code in node_modules
    supportOpts.babelRegister = {
      only: [
        x => {
          if (x.includes("@amcharts/amcharts4")) {
            return true;
          }
          // exclude everything else under node_modules
          return !x.includes("node_modules/");
        }
      ],
      cache: true
    };
  }

  // Load run time support for application
  await loadRuntimeSupport(supportOpts);

  // It's recommended to access electrodeConfig.config here
  // rather than on the root level of this file because
  // it triggers loading the config files.
  const server = await wmlServer(config);

  server.ext('onRequest', (request, h) => {
    console.log("onRequest called")
    return h.continue;
  });

  server.ext('onPreResponse', (request, h) => {
    return h.continue
  });

  server.ext("onPostAuth", async (request, h, err) => {
    return h.continue;
  });
  return server;
}

start();
