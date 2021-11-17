import * as React from 'react';
import {Modal, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
//import { ANTD_MODAL_WIDTH } from '@hub/ui-lib';
import Icon from "@ant-design/icons"
import { ProjectCreate } from './ProjectCreate';
import { ProjectSelect } from './ProjectSelect';
import { setIsProjectModalVisible } from './reducers';

export function Project() {
  const isProjectModalVisible = useSelector(state => state.isProjectModalVisible);
  const dispatch = useDispatch();

  const closeIcon = <Icon type='close' onClick={() => dispatch(setIsProjectModalVisible(false))}/>

  return <Modal width={200}
                centered={true}
                visible={isProjectModalVisible}
                footer={null}
                closeIcon={closeIcon}
                maskClosable={false}
                destroyOnClose={true}
                className='project-select'>
    <div className='project' style={{ minHeight: '500px', maxHeight: '500px' }}>
      <Tabs size={'large'} tabBarStyle={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs.TabPane tab='Select Project' key='selectProject' forceRender={true}>
          <ProjectSelect/>
        </Tabs.TabPane>
        <Tabs.TabPane tab='Create Project' key='createProject' forceRender={true}>
          <ProjectCreate/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  </Modal>
}
