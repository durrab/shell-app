import axios from 'axios';
import { routesConfig } from '../common/Routes';

export async function fetchProductCategories() {
  let productCategory = {};
  try {
    const resp = await axios.get(`/common/api/products/category?shallow=true`);
    if (resp && resp.status === 200) {
      productCategory = resp["data"];
    }
  } catch (err) {
    console.error("ERROR: fetching product category");
    console.error(err);
  }
  return productCategory;
}

export async function fetchProductList() {
  let productList = [];
  try {
    const resp = await axios.get(`/common/api/products`);
    if (resp && resp.status === 200) {
      productList = resp["data"];
    }
  } catch (err) {
    console.error("ERROR: fetching product list");
    console.error(err);
  }
  return productList;
}

export function getProductIdByPath() {
  const pathParts = cleanupUrlPath(window.location.pathname).split('/');
  const subappPath = pathParts[1];
  if (pathParts.length >= 2) {
    const subapp = Object.keys(routesConfig).find(subapp => {
      let productPathInConfig = routesConfig[subapp].path;
      if (productPathInConfig && productPathInConfig.startsWith('/')) {
        productPathInConfig = productPathInConfig.substr(1);
      }
      return subappPath.toLowerCase() === productPathInConfig.toLowerCase();
    });

    if (subapp) {
      return [routesConfig[subapp].productId, routesConfig[subapp].pageTitle || subapp, subappPath];
    }
  }

  let pageTitle;
  switch(subappPath) {
    case "getting-started":
      pageTitle = "Getting Started";
      break;
    case "preferences":
      pageTitle = "Preferences";
      break;
  }

  return [undefined, pageTitle, subappPath];
}

// TODO: We probably should make all subapp routes based on product ID. If we do that, remove this.
export function getProductPathById(productId) {
  const subappId = Object.keys(routesConfig).find(subapp => productId === routesConfig[subapp].productId);
  return subappId && routesConfig[subappId].path;
}

export async function getCurrentProductById(productId) {
  let product = {};
  if (productId) {
    try {
      const response = await axios.get(`/common/api/products/${productId}`);
      product = response["data"]
    } catch (err) {
      console.error("ERROR: fetching product config for " + productId);
      console.error(err);
    }
  }
  return product;
}

export async function getProject(projectId) {
  let project = {};
  if (projectId) {
    try {
      const response = await axios.get(`/common/api/projects/${projectId}`);
      project = response["data"]
    } catch (err) {
      console.error("ERROR: fetching project config for " + projectId);
      console.error(err);
    }
  }
  return project;
}

export function cleanupUrlPath(pathname) {
  // only handle repeated "/"'s for now -- that's the only one I can think of.
  return pathname.replace(/\/\/*/g, '/');
}

// The following are for AntD v4 upgrade, so that we can load different CSS version based on AntD version of a sub-app.
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}

const memoizedGetter = () => {
  const pathToIsAntdV4Map = {};

  const populate = () => {
    const subappKeys = Object.keys(routesConfig);
    for (let i = 0; i < subappKeys.length; i++) {
      const subapp = routesConfig[subappKeys[i]];
      pathToIsAntdV4Map[subapp.path.toLowerCase()] = !!subapp.isAntdV4;
    }
  }

  return (subappPath) => {
    if (Object.keys(pathToIsAntdV4Map).length === 0) {
      populate();
    }
    return pathToIsAntdV4Map[`/${subappPath}`.toLowerCase()];
  };
}
const isAntdV4Products = memoizedGetter();

const getCurrentTime = () => Date().toLocaleString().substr(16, 8);
function loadNewAntdCss(antdCssId, src) {
  console.log(getCurrentTime(), '--> Loading Antd CSS: ', src, '...');

  const link = document.createElement('link')
  link.setAttribute('id', antdCssId)
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', src)
  document.head.appendChild(link)
}

export const fetchAntdCssFromCDN = (subappPath) => {
  const antdCssId = 'antd-css';
  const v4Css = "https://cdnjs.cloudflare.com/ajax/libs/antd/4.16.13/antd.min.css";
  const v3Css = "https://cdnjs.cloudflare.com/ajax/libs/antd/3.26.15/antd.min.css";

  const src = isAntdV4Products(subappPath) ? v4Css : v3Css;

  console.log(getCurrentTime(), '--> Current Antd CSS: ', document.getElementById(antdCssId) && document.getElementById(antdCssId).href);
  if (document.getElementById(antdCssId) && document.getElementById(antdCssId).href === src) return;

  if (document.getElementById(antdCssId) !== null) {
    document.getElementById(antdCssId).remove();
  }

  loadNewAntdCss(antdCssId, src);
}