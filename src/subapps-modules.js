const SUBAPP_PREFIX = "@hub";

/*

"hub-ui-azuresql",
  "hub-ui-wcnp",
  "hub-ui-ams",
  "hub-ui-ase",
  "hub-ui-cognitiveservices",
  "hub-ui-cosmos",
  "hub-ui-meghacache",
  "hub-ui-elasticsearch",
  "hub-ui-cassandra",
  "hub-ui-solr",
  "hub-ui-azureadb2c",
  "hub-ui-keyvault",
  "hub-ui-googlemysql",
  "hub-ui-managedvms"
*/

// List of all subapps
const listOfSubapps = [
  
];

const subappManifests = {};
listOfSubapps.forEach((app) => {
  const pkgName = `${SUBAPP_PREFIX}/${app}`;
  subappManifests[pkgName] = require(pkgName).manifest;
});

module.exports = subappManifests;
