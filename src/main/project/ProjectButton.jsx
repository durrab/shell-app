import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "@ant-design/icons"
import get from 'lodash/get';
import { setIsProjectModalVisible } from './reducers';

import './project.css';

export function ProjectButton() {
  const user = useSelector(state => state.user);
  const project = useSelector(state => state.project);
  const userPreferences = useSelector(state => state.userPreferences);
  const isProjectModalVisible = useSelector(state => state.isProjectModalVisible);

  const dispatch = useDispatch();

  const projectTitle = project.displayName || project.id;
  const buttonText = canView(user, project) ? projectTitle : 'Select or Create Project';

  return <div className='project_button' onClick={() => dispatch(setIsProjectModalVisible(!isProjectModalVisible))}>
    <div className='ellipsized_text'>
      <Icon className='icon' type='code-sandbox'/>
      &nbsp;
      {buttonText}
    </div>
    <div><Icon className='icon' type='caret-down'/></div>
  </div>;
}

function canView(user, project) {
  if (user && user.groups && Array.isArray(user.groups) && project && project.activeDirectoryGroup) {
    return user.groups.includes(project.activeDirectoryGroup);
  }
  return false;
}
