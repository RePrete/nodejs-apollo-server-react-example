import React from 'react';
import ConstructionCompanyList from "./ConstructionCompanyList";
import {Breadcrumb, Image, Layout, Menu, Typography} from 'antd';
import {ItemType} from "antd/lib/menu/hooks/useItems";
const { Header, Content, Footer, Sider } = Layout;
const {Text} = Typography;

const menuItems: ItemType[] = [
  {
    key: "companies",
    label: "Companies",
    children: [
      {
        key: "companies-specialities",
        label: "By specialities"
      }
    ]
  }
];

const App = () => (
  <div className="App">
    <Layout>
      <Header className="header" style={{background: "#265ac9"}}>
        <Image preview={false} src="https://assets-global.website-files.com/61b9cbb9545e8a9f72deb0b3/61b9d39239a08a798184df38_Logo%20White.svg" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Companies</Breadcrumb.Item>
          <Breadcrumb.Item>By specialities</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['companies-specialities']}
              defaultOpenKeys={['companies']}
              style={{ height: '100%' }}
              items={menuItems}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <ConstructionCompanyList></ConstructionCompanyList>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Text italic>
          @Cosuno tech challange
        </Text>
      </Footer>
    </Layout>
  </div>
);

export default App;