const Path = require("path");

const isDocker = require("is-docker");

// List of microsites
/*const azuresql = require("@hub/hub-ui-azuresql");
const wcnp = require("@hub/hub-ui-wcnp");
const ams = require("@hub/hub-ui-ams");
const ase = require("@hub/hub-ui-ase");
const cognitiveservices = require("@hub/hub-ui-cognitiveservices");
const cosmos = require("@hub/hub-ui-cosmos");
const meghacache = require("@hub/hub-ui-meghacache");
const keyvault = require("@hub/hub-ui-keyvault");
const elastic = require("@hub/hub-ui-elasticsearch");
const cassandra = require("@hub/hub-ui-cassandra");
const solr = require("@hub/hub-ui-solr");
const azureadb2c = require("@hub/hub-ui-azureadb2c");
const googlemysql = require("@hub/hub-ui-googlemysql");
const managedvms = require("@hub/hub-ui-managedvms");*/

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
  /*"/wcnp/{args*}": {
    pageTitle: "DX Console | WCNP",
    subApps: [["@hub/hub-ui-wcnp", wcnp.subAppOptions]],
    templateFile: "./templates/wcnp",
    ...commonRouteOptions
  },
  "/walmart-cloud-native-platform/{args*}": {
    pageTitle: "DX Console | WCNP",
    subApps: [["@hub/hub-ui-wcnp", wcnp.subAppOptions]],
    templateFile: "./templates/wcnp",
    ...commonRouteOptions
  },
  "/cognitiveservices/{args*}": {
    pageTitle: "DX Console | Cognitiveservices",
    subApps: [["@hub/hub-ui-cognitiveservices", cognitiveservices.subAppOptions]],
    templateFile: "./templates/cognitiveservices",
    ...commonRouteOptions
  },
  "/cosmos/{args*}": {
    pageTitle: "DX Console | Cosmos",
    subApps: [["@hub/hub-ui-cosmos", cosmos.subAppOptions]],
    templateFile: "./templates/cosmos",
    ...commonRouteOptions
  },
  "/ams/{args*}": {
    pageTitle: "DX Console | AMS",
    subApps: [["@hub/hub-ui-ams", ams.subAppOptions]],
    templateFile: "./templates/ams",
    ...commonRouteOptions
  },
  "/ase/{args*}": {
    pageTitle: "DX Console | Managed ASE",
    subApps: [["@hub/hub-ui-ase", ase.subAppOptions]],
    templateFile: "./templates/ase",
    ...commonRouteOptions
  },
  "/azuresql/{args*}": {
    pageTitle: "DX Console | Azure SQL",
    subApps: [["@hub/hub-ui-azuresql", azuresql.subAppOptions]],
    templateFile: "./templates/azuresql",
    ...commonRouteOptions
  },
  "/meghacache/{args*}": {
    pageTitle: "DX Console | MeghaCache",
    subApps: [["@hub/hub-ui-meghacache", meghacache.subAppOptions]],
    templateFile: "./templates/meghacache",
    ...commonRouteOptions
  },
  "/elasticsearch/{args*}": {
    pageTitle: "DX Console | Elasticsearch",
    subApps: [["@hub/hub-ui-elasticsearch", elastic.subAppOptions]],
    templateFile: "./templates/elasticsearch",
    ...commonRouteOptions
  },
  "/cassandra/{args*}": {
    pageTitle: "DX Console | Cassandra",
    subApps: [["@hub/hub-ui-cassandra", cassandra.subAppOptions]],
    templateFile: "./templates/cassandra",
    ...commonRouteOptions
  },
  "/solr/{args*}": {
    pageTitle: "DX Console | Solr",
    subApps: [["@hub/hub-ui-solr", solr.subAppOptions]],
    templateFile: "./templates/solr",
    ...commonRouteOptions
  },
  "/azureadb2c/{args*}": {
    pageTitle: "DX Console | Azureadb2c",
    subApps: [["@hub/hub-ui-azureadb2c", azureadb2c.subAppOptions]],
    templateFile: "./templates/azureadb2c",
    ...commonRouteOptions
  },
  "/googlemysql/{args*}": {
    pageTitle: "DX Console | Googlemysql",
    subApps: [["@hub/hub-ui-googlemysql", googlemysql.subAppOptions]],
    templateFile: "./templates/googlemysql",
    ...commonRouteOptions
  },
  "/keyvault/{args*}": {
    pageTitle: "DX Console | Keyvault",
    subApps: [["@hub/hub-ui-keyvault", keyvault.subAppOptions]],
    templateFile: "./templates/keyvault",
    ...commonRouteOptions
  },
  "/managedvms/{args*}": {
    pageTitle: "DX Console | Managedvms",
    subApps: [["@hub/hub-ui-managedvms", managedvms.subAppOptions]],
    templateFile: "./templates/managedvms",
    ...commonRouteOptions,
  },*/
  "/{any*}": {
    pageTitle: "404",
    subApps: [["./pageNotFound", subAppOptions]],
    templateFile: "./templates/pageNotFound",
    ...commonRouteOptions,
  },
};
