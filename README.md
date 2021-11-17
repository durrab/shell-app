# Hub

[![Build Status](https://ci.wcnp.walmart.com/buildStatus/icon?job=strati%2Fstrati-hub-app%2Fmaster)](https://ci.wcnp.walmart.com/job/strati/job/strati-hub-app/job/master/)
[![KITT badge](https://kitt-badges.k8s.walmart.com/kittbadge?org=hub&repo=hub-common-api)](https://concord.prod.walmart.com/#/org/strati/project/pipeline/process?meta.repoMetadata=strai%2Fstrati-hub-app&limit=50)

Hub is a unified Cloud platform that integrates all Strati Products - from onboarding, management, configuration, and cost tracking.

This project uses electrode X as UI platform. Click [here](https://wmlink/electrode) for docs

## Engines

```bash
node: 12.X
npm: 6.X
```

## Prereq for setting up https and SSO

- Your should be using a Mac Book Pro with at least MacOS Mojave (version 10.14.6 as of this writing)
- Add a `/etc/hosts` entry:

  ```bash
  127.0.0.1       dev.walmart.com
  ```

- Import the SSL certificate to your System keychain, if you haven't done so.

   ```bash
   sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain config/dev-proxy.crt
   ```

## Staging and Production urls

- staging: <https://hub-app-stg.strati.walmart.com/>
- production: <https://hub.strati.walmart.com/>

## Installation

### Step 1 - Git clone

```bash
git clone https://gecgithub01.walmart.com/strati/strati-hub-app.git
```

### Step 2 - Install node modules

You can install node modules using npm.

```bash
npm install
```

### Step 3 - Manually add dev-proxy.key

You need to copy content of `dev-proxy.key` from [Vault](https://prod.master.enterprisevault.glb.us.walmart.net:8200/ui/vault/secrets/secret/show/strati-hub-admin/strati-hub-ui/dev?namespace=k8s), and put it in file `/config/dev-proxy.key`.

### Step 4 - Run locally in dev mode

_NOTE:_
If running MacOs < Mojave, you will need to open another terminal window and run: `sudo HOST=dev.walmart.com PORT=443 npx clap dev-proxy`

Open terminal and execute the following (keep it running)

```bash
npm run dev
```

Open browser and go to the following url: <https://dev.walmart.com>

## Testing sub-apps Locally

Using hub-ui-azuresql as an example.

In your local `hub-ui-azuresql` directory:

1. run `npm link`
2. run clap compile to generate lib directory: `npm install; clap compile`

In your local `strati-hub-app` directory:

1. run `npm link @hub/hub-ui-azuresql`
2. run `npm run dev`

To refresh your change on `hub-ui-azuresql`. Do the following in your `hub-ui-azuresql` directory:

1. run npm install to install the latest change; run clap compile to repackage: `npm install; clap compile`
2. refresh your browser page.

## Running In Cloud Deployment Mode Locally

When the app is deployed to the cloud (OneOps), assets from `dist` are uploaded to CDN (pronto) and the config files `config/oneops-*` are used.

By default, the config file `config/oneops-default.json` is always loaded, and depending on the env var `ONEOPS_ENVPROFILE`, one of this would be loaded:

| `ONEOPS_ENVPROFILE` value | config file that's loaded    |
| ------------------------- | ---------------------------- |
| `mock`                    | `config/oneops-mock.json`    |
| `dev`                     | `config/oneops-dev.json`     |
| `prod`                    | `config/oneops-prod.json`    |
| `staging`                 | `config/oneops-staging.json` |

To start the app on your local like it's deployed to OneOps, use these steps:

1. `npm run build` - build the app in prod mode
2. `clap mock-cloud` - run the app with `ONEOPS_ENVPROFILE` set to `mock`

- **Refreshing**: When `mock-cloud` is running, you can run `npm run build` again and the app will auto restart.
- **Different env**: You can run with different cloud env by setting `ONEOPS_ENVPROFILE`, for example: `ONEOPS_ENVPROFILE=dev clap mock-cloud`
- **Debugging**: You can start the app in debug mode also: `clap mock-cloud --inspect-brk`

## Troubleshooting

1. `[proxy] Error: listen EACCESS: permission denied 0.0.0.0:443` error

   The solution here is only needed if `npm run dev` gives you the error above.

   If you get the `EACCESS` error, it means your MacOS is not Mojave, which now permits user programs to listen on ports below 1024.

   To solve this, you may start the `dev-proxy` in another terminal with `sudo` by doing: `sudo npm run dev-proxy`

   And then run `npm run dev` in your regular terminal normally.

2. `[proxy] Error: listen EADDRINUSE :::443`

   This means you have another process that's listening on TCP port 443.

   - To find out which process it is, use the command `sudo lsof -i tcp:443`
   - Then look for the process that's listening on `*:https`, get its PID, and use `kill` to stop it.
   - Please stop nginx if you have it running.
   - Generally just close/kill any other process that you have started.

## Build/Deploy

- Uses WCNP (electrode profile) for deployment
- Slack channel to which build notifications are sent: [#strati-hub-ops](https://walmart.slack.com/archives/CU9QXLT50)
- Every commit to master will trigger a build that pushes to staging automatically
- Looper build pipeline: <https://ci.wcnp.walmart.com/job/strati/job/strati-hub-app>
- Refer kitt.yml for more information on how build/deployment is configured.


## Using Remote Subapps

Webpack 5 and Electrode's subapp system allows us to load JS bundles dynamically at runtime.  These bundles can be
loaded in one of two ways:

1. Through our environment-specific UI configuration defined in config/development.js|oneops-*.json.  Values here will
   take precedence over option #2 and is primarily used for local testing.  Refer to the commented out section in ui config
   in development.js for reference.  The URL you see there can be a local subapp that is running locally with the `npm run remote`
   command or another path available over http that points to a subapp bundle.
   
2. Our Hub Common API through the /common/api/subapps endpoint.  This is the preferred way to load subapps in any of our remote
   environments -- stage, prod, etc.  Details of how subapps are deployed and managed will be provided in the text below.

### Run locally as remote subapp

You can bring in a locally running remote subapp into the shell as follows:

In a subapp that has been updated for webpack 5 run:

```
$ npm run remote
```

In shell app, update the subapp ui config to include the bundle.

For example to bring in Code subapp:

```
...
"ui": {
    "subapps": {
      "code": "https://dev.walmart.com:8444/js/_remote_~.hub_ui_code.js"
    }
    ...
}
```

[https://dev.walmart.com/code](https://dev.walmart.com/code)

## Subapp Deployment

The subapp build process includes two key steps:  deploying to Pronto CDN and recording the version/url mapping.  URL-to-version
mapping is done via our Hub Common API and stored in our database.  Each subapp version and its pronto url are recorded as part of the
build process.  (See [Hub Common API docs](http://common.hub.walmart.com/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/Subapps)
here for details about these endpoints).  Deployment to all non-prod environments will be done automatically upon build completion.
Deployment simply means marking the version-to-url mapping record as "active".

Remote subapps will automatically render the "active" version.  For non-prod locations any subapp version that has been recorded
can be loaded dynamically at runtime using the showVersion=x query parameter
when on that subapp's path in DX Console.  For example, if wcnp v2 is recorded with a pronto URL you would be able to hit:

https://console-stage.dx.walmart.com/wcnp?showVersion=2

A 404 error will be displayed if trying to load versions that have not been recorded.  This parameter will be ignored in production.

TODO: fill out this more as it relates to deploying to prod
