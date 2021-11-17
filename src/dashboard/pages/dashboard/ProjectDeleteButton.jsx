import React, { Fragment, useState } from 'react';
import { Alert, Button, Input, Modal, Tooltip } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

export function ProjectDeleteButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
   
      <Modal
        title='Are you sure?'
        width={1000}
        centered={true}
        destroyOnClose={true}
        footer={null}
        visible={showModal}
        maskClosable={true}

      >
      
      </Modal>
    </Fragment>
  );
}
