import wcnp from "../images/subAppIcons/wcnp.svg";
import cosmos from "../images/subAppIcons/cosmos.svg";
import azuresql from "../images/subAppIcons/azuresql.svg";
import ase from "../images/subAppIcons/ase.svg";
import cassandra from "../images/subAppIcons/cassandra.svg";
import cognitiveservices from "../images/subAppIcons/cognitiveservices.svg";
import elasticsearch from "../images/subAppIcons/elasticsearch.svg";
import meghacache from "../images/subAppIcons/megahcache.svg";
import keyvault from "../images/subAppIcons/keyvault.svg";
import solr from "../images/subAppIcons/solr.svg";
import rediscache from "../images/subAppIcons/rediscache.svg";
import azureadb2c from "../images/subAppIcons/azureadb2c.svg";
import kafka from "../images/subAppIcons/kafka.svg";
import googlemysql from "../images/subAppIcons/googlemysql.svg";
import ams from "../images/subAppIcons/ams.svg";
import managedvms from "../images/subAppIcons/managedvms.svg";
import cloudrdbms from "../images/subAppIcons/cloudrdbms.svg";
import mssqlserver from "../images/subAppIcons/mssqlserver.svg";
import postgres from "../images/subAppIcons/azurepostgresql.svg";
import pipelinevisualizer from "../images/subAppIcons/pipelinevisualizer.svg";
import { routesConfig } from '../common/Routes';

// TODO: move images to a CDN and set this in product info.
export const productImageMapper = {
  "walmart-cloud-native-platform": wcnp,
  "cosmosdb": cosmos,
  "azure-sql": azuresql,
  "managed-ase": ase,
  cassandra,
  cognitiveservices,
  "elastic": elasticsearch,
  meghacache,
  keyvault,
  solr,
  rediscache,
  azureadb2c,
  kafka,
  googlemysql,
  ams,
  managedvms,
  postgres,
  mssqlserver,
  cloudrdbms,
  pipelinevisualizer
}

/**
 * Check if a product has a matching sub-app id, if so, return it.
 * @param product
 * @returns {string}
 */
export function getSubappId(product) {
  return Object.keys(routesConfig).find(subappId => {
    // get correctly configured subapps for products only (not Home, Main, etc.)
    return routesConfig[subappId].path !== undefined
      && routesConfig[subappId].productId !== undefined
      && routesConfig[subappId].productId === product.id;
  });
}

export const FILTER_TYPE = {
  SELF_SERVICE: "SELF_SERVICE",
  SELF_SERVICE_AND_ACTIVE: "SELF_SERVICE_AND_ACTIVE"
}

/**
 * class to lump together all productCategories related logic.
 */
export class FilteredProductCategories {
  constructor(productCategories) {
    this.filteredProductCategories = {...productCategories};
  }

  filterByFlags(filterType) {
    const newProductCategories = {};
    Object.keys(this.filteredProductCategories).forEach(categoryId => {
      const category = {...this.filteredProductCategories[categoryId]};
      // 1. filter out categories without products.
      if (category.products && Array.isArray(category.products)) {
        switch (filterType) {
          case FILTER_TYPE.SELF_SERVICE:
            // 2.1 filter out category without selfService products
            category.products = category.products.filter(product => product.selfService);
            break;
          case FILTER_TYPE.SELF_SERVICE_AND_ACTIVE:
            // 2.2 filter out category without selfService and active products
            category.products = category.products.filter(product => product.selfService && product.status === 'ACTIVE');
            break;
          default:
            console.warn("Invalid filter type provided for product categories, all products will be displayed");
        }
        if (category.products && category.products.length > 0) {
          newProductCategories[categoryId] = category;
        }
      }
    })
    this.filteredProductCategories = newProductCategories;
    return this;
  }

  filterByAndApplySubappConfig() {
    const newProductCategories = {};
    Object.keys(this.filteredProductCategories).forEach(categoryId => {
      const category = {...this.filteredProductCategories[categoryId]};
      // 1. filter out categories without products.
      if (category.products && Array.isArray(category.products)) {

        // 2. filter out categories without subapp config.
        // 3. add that config to product info, so it can be used later.
        category.products = category.products.filter(product => {
          const subappId = getSubappId(product);
          if (subappId !== undefined) {
            product["subappConfig"] = routesConfig[subappId]
            return true;
          }
          return false;
        });

        if (category.products && category.products.length > 0) {
          newProductCategories[categoryId] = category;
        }
      }
    })
    this.filteredProductCategories = newProductCategories;
    return this;
  }

  get value() {
    return this.filteredProductCategories;
  }
}
