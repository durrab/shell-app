const Path = require("path");

const isDocker = require("is-docker");
const subAppOptions = {
  serverSideRendering: false,
};

const settings = {
  options: {
    auth: "sso-pingfed"
  },
};
const tokenHandlers = [Path.join(__dirname, "./token-handler")];
const criticalCSS = Path.join(__dirname, "./templates/global.css");

const commonRouteOptions = {
  tokenHandlers,
  criticalCSS
}

export const favicon = isDocker() ? "dist/static/favicon.ico" : "static/favicon.ico";

// TODO: update / to dashboard subapp when general release.
// Even with redirect, we still need / config, without it, somehow main won't bootstrap when session expires.
// It's the same problem as go to a `/garbage_url` when session expires -- it won't even authenticate.
export default {
  "/": {
    pageTitle: "DX Console | Marketplace",
    subApps: [["./marketplace", subAppOptions]],
    templateFile: "./templates/marketplace",
    ...commonRouteOptions
  },

  "/dashboard/{args*}": {
    pageTitle: "DX Console | Dashboard",
    subApps: [["./dashboard", subAppOptions]],
    templateFile: "./templates/dashboard",
    ...commonRouteOptions
  },
  "/marketplace": {
    pageTitle: "DX Console | Marketplace",
    subApps: [["./marketplace", subAppOptions]],
    templateFile: "./templates/marketplace",
    ...commonRouteOptions
  },
  "/info/{args*}": {
    pageTitle: "DX Console | Info",
    subApps: [["./info", subAppOptions]],
    templateFile: "./templates/info",
    ...commonRouteOptions
  },
  "/support/{args*}": {
    pageTitle: "DX Console | Support",
    subApps: [["./support", subAppOptions]],
    templateFile: "./templates/support",
    ...commonRouteOptions
  },
  "/{any*}": {
    pageTitle: "404",
    subApps: [["./pageNotFound", subAppOptions]],
    templateFile: "./templates/pageNotFound",
    ...commonRouteOptions,
  },
};
