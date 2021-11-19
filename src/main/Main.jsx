import { useEffect, useState } from 'react';
import { Link, Route, useLocation, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryState } from 'react-router-use-location-state';
import { ui as uiConfig } from 'electrode-ui-config';
import logger from 'electrode-ui-logger';
import { React } from 'subapp-react';
import { Calendar, Layout, message, Modal, Menu, Breadcrumb, Divider } from 'antd';
import { ProjectButton } from './project/ProjectButton';
import hubDXConsoleLogo from '../images/branding-logo/dx-console-white.svg';
import hubDXConsoleLogoDev from '../images/branding-logo/dx-console-white-dev.svg';
import hubDXConsoleLogoStage from '../images/branding-logo/dx-console-white-stage.svg';
import { Project } from './project/Project';
import LeftDrawer from './leftDrawer';
import { subappMain } from './reducers';
import { setIsProjectLoading } from './project/reducers';
import { RightDrawer } from './rightDrawer';
import SubAppRoutes from '../common/Routes';
import { GettingStarted } from './pages/GettingStarted';
import { Preferences } from './pages/Preferences';
import { get } from 'lodash';
import {
 
  PieChartOutlined,
  DashboardOutlined,
  CarOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import './antdV4UpgradeTemp.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const env = uiConfig && uiConfig['ENV'];

const HubHeader = () => {
  return (
    <div style={{ paddingBottom: `${100}px` }}>
      <div>
        <h1>Header is here</h1>
      </div>
      <Project />
      <LeftDrawer headerPadding={50} />
    </div>
  );
};

function HubFooter() {
  // footer is mounted at bottom 0, with height of 189. We need to pad it up to unmask the content.
  return (
    <footer style={{ paddingTop: '189px' }}>
      <h1>Footer is here</h1>
    </footer>
  );
}

const MainRoutes = () => {
  // returning an array as the Switch component in App below only looks at direct children
  // wrapping in a fragment would prevent it from working

  return [
    <Route
      path='/getting-started'
      exact
      render={() => (
        <div className='app-content' style={{ margin: 'unset' }}>
          <GettingStarted />
        </div>
      )}
    />,
    <Route
      path='/preferences'
      exact
      render={() => (
        <div className='app-content' style={{ margin: 'unset' }}>
          <Preferences />
        </div>
      )}
    />,
    <Route
      render={() => (
        <div className='app-content' style={{ margin: 'unset' }}>
          <div>
            <>
              Please check your referring URL or go back <a href='/'>home</a>.
            </>
          </div>
        </div>
      )}
    />,
  ];
};

export const App = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapsed = (col) => {
    setCollapsed(col);
  };
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed} breakpoint='lg'>
          <div className='logo' />
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Divider/>
            <Divider/>
            <Menu.Item key='1' icon={<DashboardOutlined />}>
              <Link to='/dashboard' className='dashboard'>
                Dashboard
              </Link>
            </Menu.Item>
            <SubMenu key='sub2' icon={<CarOutlined />} title='Vehicles'>
              <Menu.Item key='2'><Link to="/vehicle/list">List All</Link></Menu.Item>
              <Menu.Item key='3'><Link to="/vehicle/search/vin">Search By VIN</Link></Menu.Item>
              <Menu.Item key='4'>
              <Link to='/deal' className='dashboard'>
              <Link to="/vehicle/search/imei">Search By IMEID</Link>
              </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key='sub1' icon={<GlobalOutlined />} title='Global Geofence'>
              <Menu.Item key='5'>
              <Link to='/marketplace'>Marketplace</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key='6' icon={<GlobalOutlined />}>
              <Link to='/getting-started' className='dashboard'>
               Global Alarms
              </Link>
            </Menu.Item>
          
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Header className='site-layout-background' style={{ padding: 10 }}></Header>
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              {SubAppRoutes()}
              {MainRoutes()}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  );
};

/*


render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
            {SubAppRoutes()}
            {MainRoutes()}
           </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }






*/
