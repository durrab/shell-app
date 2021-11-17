import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, Menu } from 'antd';
//import { IconWrapper, StratiProducts } from '@hub/ui-lib';

import { subappMain } from '../reducers';
import { cleanupUrlPath, getProductIdByPath } from '../utils';
import { FILTER_TYPE, FilteredProductCategories, productImageMapper } from '../../commonUtils';

import './style.css';

export default function LeftDrawer(props) {

  let dashboard = (
    <Menu.Item key='dashboard'>
      <Link to='/dashboard' className='dashboard'>
       
        Dashboard
      </Link>
    </Menu.Item>
  );

  const gettingStarted = (
    <Menu.Item key='gettingStarted'>
      <Link to='/getting-started'>
        
        Getting Started
      </Link>
    </Menu.Item>
  );

  const marketplace = (
    <Menu.Item key='marketplace'>
      <Link to='/marketplace'>
       
        Marketplace
      </Link>
    </Menu.Item>
  );

  const cost = (
    <Menu.Item key='cost'>
      <Link to='/cost'>
      
        Cost
      </Link>
    </Menu.Item>
  );

  // add an empty item at bottom, so the last item shows when the list is long and scrolling to the bottom.
  return (
    <Drawer
      className='left-drawer'
      placement='left'
      closable={false}
      visible={true}
      style={{ paddingTop: `${50}px` }}
    >
      <Menu style={{ backgroundColor: 'red' }} mode='inline'>
        {dashboard}
        {gettingStarted}
        {marketplace}
        {cost}
        <Menu.Divider className='section-divider' />
        <Menu.Item />
      </Menu>
    </Drawer>
  );
}