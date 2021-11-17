import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryState } from 'react-router-use-location-state';
//import { DynamicForm, setProject, submitWithConfirm } from '@hub/ui-lib';
import { setIsProjectModalVisible } from './reducers';

// TODO: clean up after Antd v4 upgrade.
import './antdV4UpgradeTempSelect.css';
// TODO: End.

export function ProjectCreate() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fields = require('./projectCreate.json');
  //const [, setProjectIdQuery] = useQueryState('projectId', '');

  const onCancel = () => dispatch(setIsProjectModalVisible(false));
  const onOk = (values, returnPayload) => {
    dispatch(setIsProjectModalVisible(false));
   // dispatch(setProject(returnPayload));
    //setProjectIdQuery(returnPayload.id);
  };

  const onSuccessMessage = (values, returnPayload) => {
    return returnPayload && returnPayload.id !== undefined
      ? `Project ${returnPayload.id} Created Successfully`
      : 'Project Created Successfully';
  };

  const onSubmit = async (values) => {
    if (values && values.displayName && typeof values.displayName === 'string') {
      values.displayName.trim();
    }

    return null;
  };

  return (
    <div className='project-create' style={{ margin: '30px 30px' }}>
     Form is here
    </div>
  );
}
