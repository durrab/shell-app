const { loadDevTasks, xrun } = require('@xarc/app-dev');
const _ = require("lodash");

exports.xrun = xrun;
xrun.updateEnv(
  {
    //
    //  Enable Electrode's built-in webpack dev server and reverse proxy for development
    //
    WEBPACK_DEV_MIDDLEWARE: true,
    //
    // Set app's node server to listen at port 3100 so the proxy can listen at 3000
    // and forward request to the app.
    //
    APP_SERVER_PORT: 9001,
    HOST: 'localhost',
   // XARC_DEV_HTTPS: 443,

    /*
     * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
     *
     * This basically adds a bunch of extra JavaScript to the browser to simulate
     * some NodeJS modules like `process`, `console`, `Buffer`, and `global`.
     *
     * Docs here: https://github.com/webpack/docs/wiki/internal-webpack-plugins#nodenodesourcepluginoptions
     *
     */
    ENABLE_NODESOURCE_PLUGIN: true,
    USE_APP_WEBPACK_CONFIG: true,
    NODE_OPTIONS: '--max-http-header-size=16384 --max-old-space-size=2048',
  },
  { override: true }
);

const deps = require('./package.json').dependencies;

loadDevTasks(xrun, {
  webpackOptions: {
    minify:true,
    useAppWebpackConfig: true,
    cssModuleSupport: false,
    v1RemoteSubApps: {
      name: 'shell-app',
      shared: {
        react: {
          shareKey: 'react',
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        'react-redux': {
          singleton: true,
        },
        'styled-components': {
          singleton: true
        },
        'react-router-dom': {
          singleton: true,
        },
        'redux': {
          singleton: true,
        },
        'subapp-web': {
          singleton: true,
        },
        '@ant-design/icons': {
          singleton: true,
        }
      },
    },
  },
});

//
// Load utils for building WML Electrode apps
//

/*
 * Load some custom xrun tasks into app namespace
 */
xrun.load('app', {
  webpackOptions: {
    minify:true,
    useAppWebpackConfig: true,
    cssModuleSupport: false,
  },
});
//loading wml tasks for publishing
//loadWmlBuildTasks(xrun);

/*
 * Load some custom xrun tasks into app namespace
 */
xrun.load("app", {
  //
  // A mock-cloud task that sets up some env and use task electrode/mock-cloud
  // to run app locally with a CDN mock and HTTPS similar to a deployed cloud env
  //
  "mock-cloud": {
    desc: `Run app locally like it's deployed on a cloud with CDN mock
    - options: [any node.js options will be passed to app server]
    - Default envs: ONEOPS_ENVPROFILE: mock | HOST: dev.walmart.com | PORT: 443 | NODE_ENV: production
    - Example: 'clap mock-cloud --inspect-brk' - allow you to connect debugger to your app server.
    - App will auto restart to load updated files after 'npm run build' in another terminal.`,
    task(context) {
      console.log("APP_SERVER_PORT", process.env.APP_SERVER_PORT);
      const defaultEnvs = {
        HOST: "dev.test.com",
        PORT: 443,
        NODE_ENV: "production",
        ONEOPS_ENVPROFILE: "dev",
      };
      const setEnvs = xrun.updateEnv(defaultEnvs, {
        override: false,
        target: _.pick(process.env, Object.keys(defaultEnvs)),
      });

      console.log(`
Starting app in mock cloud mode with these env settings:
${JSON.stringify(setEnvs, null, 2)}
`);
      return [xrun.env(setEnvs), `electrode/mock-cloud ${context.args.join(" ")}`];
    },
  },
});