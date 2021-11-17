async function loadModule(scope, module) {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default');

  const container = window && window[scope]; // or get the container somewhere else

  if (container) {
    console.log(__webpack_share_scopes__.default)

    await container.init(__webpack_share_scopes__.default);
    console.log(window[scope])
    const factory = await window[scope].get(module, scope);

    try {
      const Module = factory();
      return Module;
    } catch (e) {
      console.error("Unable to load subapp", e)
    }
  }
  return null;
}

function loadRemoteModule(url, scope, module) {
  console.log(`Loading module ${module} / ${scope}`)

  return new Promise((resolve, reject) => {

    if (window && window[scope]) {
      loadModule(scope, module).then((x) => {
        console.log('loaded module', x, 'default', x.default);
        resolve(x);
      });
    } else {
      loadjs(url, scope, {
        success: () => {
          console.log(`scope ${scope} and module ${module}`);
          loadModule(scope, module).then((x) => {
            if (x !== null) {
              console.log('loaded module', x, 'default', x.default);
              resolve(x);
            } else {
              reject('Subapp module was not loaded');
            }
          })
        },
        error: (r) => reject('Failed to load resource ' + r)
      })
    }
  });
}

export default loadRemoteModule;
