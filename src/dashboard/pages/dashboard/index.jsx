import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import { Alert, Col, Modal, Row } from 'antd';
/*import {
  ActionButton,
  DynamicContent,
  DynamicDataContext,
  getWidget,
  IconWrapper,
  secondaryColor,
  setProject,
  SimpleContentPage,
  widgetRegistry,
} from '@hub/ui-lib';*/
import get from 'lodash/get';

import { ProjectDeleteButton } from './ProjectDeleteButton';
import { GettingStarted } from '../../../main/pages/GettingStarted';
import { findDisplayPlacement } from './widget-util';

// Required to get the resize handle and the shadow box when dragging items around
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';

import './dashboard.css';

export const ProjectDashboard = () => {
  return <GettingStarted />;
};
