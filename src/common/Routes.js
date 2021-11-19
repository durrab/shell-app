/**
 * Defines all subapp routes
 * These routes are needed when we load one subapp from other subapp
 *
 * Currently, used by "Home" subapp as user can navigate to other subapps from Home
 **/
import React from 'react';
import LoadSubapp from "./load-subapp";
import { Route, Switch, useHistory } from "react-router-dom";
//import { Spinner } from "@hub/ui-lib";
import { Redirect } from "react-router-dom";

// Name convention:
// 1. Key: name in subapp template, with only first letter capitalized, not camel case. (required by Electrode? not sure)
// 2. "path": in all lowercase.
// 3. "altPaths": whatever, redirect paths.
// 4. "productId": in all lowercase; id of product config; name of subapp file under /templates.
// 5. "isRightDrawerVisible": controls if rightDrawer is applicable to the product. Default to true.
// 6. "pageTitle": used to set document.title at sub-app level.
// 7. "isAntdV4": controls the version of AntD css, when loading sub-apps, v3 or v4. if not configured, default to v3.
export const routesConfig = {
  "Dashboard":
    {path: "/dashboard", isRightDrawerVisible: false},
  'Marketplace':
    {path: "/marketplace",  isRightDrawerVisible: false},
  "Deal": {
    path: "/deal",
    productId: "cloudrdbms",
    remote: true,
    subappId: '@hub/poc-subapp',
    pageTitle: "Deals",
    isAntdV4: true,
    name:"Deal",
    remoteUrl: "http://localhost:3001/js/_remote_~.poc_subapp.js"
  },
  "Extras": {
    path: "/extras",
    productId: "cloudrdbms",
    remote: true,
    subappId: '@hub/poc-subapp',
    pageTitle: "Extras Deals",
    isAntdV4: true,
    name:"Extras",
  },
  "Vehicle": {
    path: "/vehicle",
    productId: "cloudrdbms",
    remote: true,
    subappId: '@hub/poc-subapp',
    pageTitle: "Vehicle Sub App",
    isAntdV4: true,
    name:"Vehicle",
  },
  "Code": {
    path: '/code',
    remote: true,
    subappId: '@hub/hub-ui-code',
    pageTitle: "Accelerator",
    isRightDrawerVisible: false,
    isAntdV4: true
  },
  "Info":
    {path: "/info", isRightDrawerVisible: false},
  "Support":
    {path: "/support", isRightDrawerVisible: false},
  "Cost": {
    path: "/cost",
    productId: "cost",
    isRightDrawerVisible: false,
    remote: true,
    subappId: '@hub/hub-ui-cost',
    pageTitle: "Cost and Budget",
    isAntdV4: true
  },
  "Ams":
    {path: "/ams", productId: "ams", pageTitle: "Azure Media Services"},
  "Ase":
    {path: "/ase", altPaths: ["/managed-ase"], productId: "managed-ase", pageTitle: "Managed ASE"},
  "Azuresql":
    {path:"/azuresql", altPaths: ["/azure-sql"], productId: "azure-sql", pageTitle: "Azure SQL"},
  "Cognitiveservices":
    {path: "/cognitiveservices", productId: "cognitiveservices", pageTitle: "Azure Cognitive Services"},
  "Cosmos":
    {path: "/cosmos", altPaths: ["/cosmosdb"], productId: "cosmosdb", pageTitle: "CosmosDB"},
  "Elasticsearch":
    {path: "/elasticsearch", altPaths: ["/elastic"], productId: "elastic", pageTitle: "Elasticsearch"},
  "Firstcontact": {
    path: '/firstcontact',
    remote: true,
    subappId: '@hub/hub-ui-firstcontact',
    pageTitle: "First Contact",
    isRightDrawerVisible: false,
    isAntdV4: true
  },
  "Insights": {
    path: "/insights",
    productId: "insights",
    isRightDrawerVisible: false,
    pageTitle: "Team Productivity",
    isAntdV4: true,
    remote: true,
    subappId: '@hub/hub-ui-insights',
  },
  "Meghacache":
    {path: "/meghacache", productId: "meghacache", pageTitle: "MeghaCache"},
  "Managedvms":
    {path: "/managedvms", productId: "managedvms", pageTitle: "Managed VMs"},
  "Mssqlserver": {
    path: "/mssqlserver",
    productId: "mssqlserver",
    remote: true,
    subappId: '@hub/hub-ui-mssqlserver',
    pageTitle: "MS SQL Server",
    isAntdV4: true
  },
  "Pipelinevisualizer": {
    path: "/pipelinevisualizer",
    productId: "pipelinevisualizer",
    pageTitle: "Pipeline Visualizer",
    isRightDrawerVisible: false,
    remote: true,
    subappId: '@hub/hub-ui-pipelinevisualizer',
    isAntdV4: true
  },
  "Wcnp":
    {path: "/wcnp", "altPaths": ["/walmart-cloud-native-platform"], productId: "walmart-cloud-native-platform", pageTitle: "WCNP"},
  "Singletenant": {
    path: "/singletenant",
    altPaths: ["/wcnp-singletenant"],
    productId: "singletenant",
    pageTitle: "WCNP Single Tenant",
    remote: true,
    subappId: '@hub/hub-ui-singletenant',
    isAntdV4: true
  },
  "Cassandra":
    {path: "/cassandra", productId: "cassandra", pageTitle: "Cassandra"},
  "Solr":
    {path: "/solr", productId: "solr", pageTitle: "Solr"},
  "Azureadb2c":
    {path: "/azureadb2c", productId: "azureadb2c", pageTitle: "Azure AD B2C"},
  "Redis":
    {path: "/redis", productId: "redis", pageTitle: "RedisCache"},
  "Kafka": {
    path: "/kafka",
    productId: "kafka",
    pageTitle: "Kafka",
    remote: true,
    subappId: '@hub/hub-ui-kafka'
  },
  "Googlemysql":
    {path: "/googlemysql", productId: "googlemysql", pageTitle: "Google Maps"},
  "Keyvault":
    {path: "/keyvault", productId: "keyvault", pageTitle: "Azure KeyVault"},
  "Controlcenter": {
    path: '/controlcenter',
    pageTitle: 'Control Center',
    remote: true,
    subappId: '@hub/hub-ui-controlcenter',
    isRightDrawerVisible: false,
    isAntdV4: true
  },
  "Postgres": {
    path: '/postgres',
    productId: "postgres",
    pageTitle: "Azure Postgres",
    remote: true,
    subappId: '@hub/hub-ui-postgres',
    isAntdV4: true
  },
  "Dialogflow": {
    path: '/dialogflow',
    productId: "dialogflow",
    pageTitle: "Dialogflow",
    remote: true,
    subappId: '@hub/hub-ui-dialogflow',
    isAntdV4: true
  },
  "Secretmanager": {
    path: '/secretmanager',
    productId: "secretmanager",
    pageTitle: "Secret Manager",
    remote: true,
    subappId: '@hub/hub-ui-secretmanager',
    isAntdV4: true
  },
  "Kms": {
    path: '/kms',
    productId: "kms",
    pageTitle: "Key Management",
    remote: true,
    subappId: '@hub/hub-ui-kms',
    isAntdV4: true
  }
}

function HubSpinner() {
  //<Spinner size="large" />
  return <div style={{marginTop: "40vh", height: "100vh"}}>
    Loading...
  </div>;
}

const Redirecter = (props) => {
  // Didn't see a way to do this with the Redirect component from react-router.
  // Did a little googling and came across this:  https://stackoverflow.com/questions/58308580/react-router-declarative-redirect-while-preserving-a-portion-of-the-path
  // Seems to work as we want...
  const history = useHistory();
  const path = history.location.pathname.replace(props.from, '');
  history.push(`${props.to}${path}`);
  return null;
};

const allRedirects = Object.keys(routesConfig).reduce((combinedRedirects, subappName) => {
  const primaryPath = routesConfig[subappName].path;
  const altPaths = routesConfig[subappName].altPaths;

  if (Array.isArray(altPaths)) {
    altPaths.forEach((altPath) =>
      combinedRedirects.push(<Redirecter key={altPath} from={altPath} to={primaryPath} />)
    );
  }

  return combinedRedirects;
}, []);

const subappRoutes = Object.keys(routesConfig).map((subappName) => {

  const primaryPath = routesConfig[subappName].path;
  const remote = routesConfig[subappName].remote;
  const remoteModule = routesConfig[subappName].remoteModule;
  const remoteUrl = routesConfig[subappName].remoteUrl;
  const scope = routesConfig[subappName].scope;
  const subappId = routesConfig[subappName].subappId;

  return (
    <Route
      key={primaryPath}
      path={primaryPath}
      exact={routesConfig[subappName].exact}
      render={(props) => {
        return (
          <LoadSubapp
            dynamic
            subappId={subappId}
            name={subappName}
            key={primaryPath}
            fallback={<HubSpinner />}
            remote={remote}
            remoteModule={remoteModule}
            remoteUrl={remoteUrl}
            scope={scope}
            { ...props }
          />
        );
      }}
    />
  );
});

const Routes = () => {

  // returning an array as the Switch component (in ../main/Main.jsx) from react-router-dom only looks at direct children
  // wrapping in a fragment would prevent it from working

  return [
      <Redirect from='/' to='/dashboard' exact />,
      ...allRedirects,
      ...subappRoutes,
  ];
};

export default Routes;
