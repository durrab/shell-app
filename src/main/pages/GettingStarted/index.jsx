import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { SimpleContentPage, IconWrapper, ADGroupInput, dxioGrey, primaryColor } from '@hub/ui-lib';
import { Button, Card, Steps, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setIsProjectModalVisible } from '../../project/reducers';

const { Step } = Steps;

const GettingStartedSteps = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (newCurrent) => {
    setCurrent(newCurrent);
  };

  const descriptionStyle = { fontSize: '80px', textAlign: 'center' };

  return (
    <div className='gettingStarted'>
      <Steps
        type='navigation'
        current={current}
        onChange={onChange}
        className='gettingStartedSteps'
      >
        <Step
          title='Create Project'
          status={current === 0 ? 'process' : 'wait'}
          description={
            <div style={descriptionStyle}>
              Create Project
            </div>
          }
        />
        <Step
          title='Configure Dashboard'
          status={current === 1 ? 'process' : 'wait'}
          description={
            <div style={descriptionStyle}>
              Dashboard
            </div>
          }
        />
        <Step
          title='Scale, Manage, Monitor'
          sstatus={current === 2 ? 'process' : 'wait'}
          description={
            <div style={descriptionStyle}>
            Manage
            </div>
          }
        />
      </Steps>
      <Card style={{ background: "red", marginTop: '1rem' }}>Testing.....</Card>
    </div>
  );
};

export const GettingStarted = () => {
  return (
    <div>
      <GettingStartedSteps />
    </div>
  );
};
