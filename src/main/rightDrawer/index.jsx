import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Layout, List, Tooltip } from 'antd';
import Icon from "@ant-design/icons"
import { getProductPathById } from '../utils';
import { subappMain } from '../reducers';
import { routesConfig } from '../../common/Routes';

import './style.css';

const { Sider } = Layout;

/**
 * Top level component for right drawer. It handles logic of rendering right drawer or not.
 * @returns {null|JSX.Element}
 */
export function RightDrawer() {
  const location = useLocation();
  const project = useSelector(state => state.project);
  const isRightDrawerVisible = useSelector(subappMain.get('isRightDrawerVisible'));
  const dispatch = useDispatch();

  useEffect(() => {
    const isRightDrawerVisibleConfig = getIsRightDrawerVisibleConfig(location.pathname);
    const isProjectSelected = !!(project && project.id);
    const newIsRightDrawerVisible = isRightDrawerVisibleConfig && isProjectSelected;
    dispatch(subappMain.setIsRightDrawerVisible(newIsRightDrawerVisible));
  }, [location.pathname, project && project.id]);

  return isRightDrawerVisible ? <CollapsibleDrawer /> : null;
}

/**
 * Handle collapsible logic.
 * @returns {JSX.Element}
 */
function CollapsibleDrawer() {
  const [isDrawerExpanded, setDrawerExpanded] = useState(true);

  const onTrigger = () => setDrawerExpanded(!isDrawerExpanded);
  const tooltipMsg = `click to ${isDrawerExpanded ? 'collapse' : 'expand'} drawer`;

  const trigger = <Tooltip className='trigger' title={tooltipMsg} placement="left">
    <div onClick={onTrigger}>
      {isDrawerExpanded ? <Icon type="double-right" /> : <Icon type="double-left" />}
    </div>
  </Tooltip>;


  // Make expanded width the same as subapp left navi bar.
  return (
    <Sider
      className='right-drawer'
      trigger={null}
      theme='light'
      collapsed={!isDrawerExpanded}
      width={'250'}
      collapsedWidth='2rem'
    >
      <Card className={`right-drawer-${isDrawerExpanded ? 'expanded' : 'collapsed'}`}>
        {trigger}
        <DrawerContent isDrawerExpanded={isDrawerExpanded} />
      </Card>
    </Sider>
  );
}

/**
 * Handle layout inside the drawer.
 * @returns {JSX.Element}: a Card with heading and resource lists by types.
 */
function DrawerContent({isDrawerExpanded}) {
  const resources = useSelector(state => state.project && state.project.resources)
  const currentProductId = useSelector(state => state.currentProduct && state.currentProduct.id);
  // filter resources by current product id, then organize them by type.
  const currentProductResources = resources && resources.filter(res => res.hubProductId === currentProductId);
  const currentProductResourcesByType = mapResourcesByType(currentProductResources);

  // Header is always showing, but with only icon when collapsed.
  const headerText = isDrawerExpanded ? ' Project Resources' : '';
  const header = <h2>
    <Icon className='icon' type='code-sandbox' />{headerText}
  </h2>

  // Only show content when expanded.
  const content = isDrawerExpanded && <>
    {
      currentProductResourcesByType && Object.keys(currentProductResourcesByType).map(type => {
        const resources = currentProductResourcesByType[type];
        // Safe: type is extracted from resources, so if there's a type, there has to be at least one resource.
        const typeLabel = resources[0]['resourceTypeLabel'] || type;
        return <Fragment key={type}>
          <h3>{typeLabel}</h3>
          <List dataSource={resources} renderItem={renderResource} pagination={false} />
        </Fragment>
      })
    }
    <div className='manage-btn'>
      Resources here
    </div>
  </>;

  return (
    <Fragment>
      {header}
      {content}
    </Fragment>
  );
}

/**
 * Render an individual resource.
 * @param resource: a single resource.
 * @returns {JSX.Element}: Link to a resource page.
 */
function renderResource(resource) {
  const path = getProductPathById(resource.hubProductId);

  return (
    <List.Item key={resource.resourceId} >
      <Link
        className='ellipsized-text'
        to={`${path}/${resource.resourceType}/${resource.resourceId}`}
      >
        {resource.displayName || resource.resourceId}
      </Link>
    </List.Item>
  );
}

/**
 * Return:
 * if
 *  1. Root path only: false;
 *  2. No product routeConfig (based on path): false;
 *  3. isRightDrawerVisible explicitly configured to false: false;
 * else: true.
 * @param {string} pathname: pathname to parse.
 * @returns {boolean}
 */
function getIsRightDrawerVisibleConfig(pathname) {
  const pathParts = pathname.split('/');
  // Not to show drawer for root path only.
  if (pathParts.length <= 1) {
    return false;
  }
  const possibleProductPath = pathParts[1];

  // Only if product has isRightDrawer explicit configured to false, then false.
  // Default to true;
  const productRouteId = Object.keys(routesConfig)
    .find(key => routesConfig[key].path === "/" + possibleProductPath);
  if (!productRouteId) {
    return false;
  }

  const isRightDrawerVisible = routesConfig[productRouteId].isRightDrawerVisible;
  if (isRightDrawerVisible === false) { // only return false if explicitly configured as false. Otherwise, true.
    return false;
  }
  return true;
}

/**
 * Organize the resource list into their sub-groups by resource type.
 * @param currentProductResources
 * @returns {*}: with format of {[type: string]: resource[]}.
 */
function mapResourcesByType(currentProductResources) {
  return currentProductResources &&
    currentProductResources.reduce((resourceByType, resource) => {
      const type = resource.resourceType;
      if (Object.keys(resourceByType).includes(type)) {
        resourceByType[type].push(resource);
      } else {
        resourceByType[type] = [resource];
      }
      return resourceByType;
    }, {});
}
