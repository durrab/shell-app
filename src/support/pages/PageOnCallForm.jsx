import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import axios from 'axios';
import { useQueryState } from 'react-router-use-location-state';
import { PagerAlert } from './PagerAlert';
import { P1_SUPPORT_PRODUCT_LIST } from './P1SupportProductList';

const fieldsFromJson = require('./../config/pageOnCallForm.json');

const breadcrumbs = [
  {
    path: '',
    breadcrumbName: 'Home'
  },
  {
    path: 'support',
    breadcrumbName: P1_SUPPORT_PRODUCT_LIST
  }
];

export const PageOnCallForm = () => {
  return <div>PageOnCAllForm</div>
}
