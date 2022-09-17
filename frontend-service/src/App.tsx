import React from 'react';
import {Link, Route, Routes,} from "react-router-dom";
import ConstructionCompanyList from "./Pages/ConstructionCompanyList";
import {Image, Layout, Typography} from 'antd';
import Sidebar from "./Sidebar";
import Homepage from "./Pages/Homepage";

const { Header, Content, Footer } = Layout;
const {Text} = Typography;

const App = () => {
  return <div className="App">
    <Layout>
      <Header className="header" style={{background: "#265ac9"}}>
        <Link to="/">
          <Image preview={false}
                 src="https://assets-global.website-files.com/61b9cbb9545e8a9f72deb0b3/61b9d39239a08a798184df38_Logo%20White.svg"/>
        </Link>
      </Header>
      <Content style={{padding: '0 50px'}}>
        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
          <Sidebar />
          <Content style={{padding: '0 24px', minHeight: 280}}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/companies/by-speciality" element={<ConstructionCompanyList />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        <Text italic>
          @Cosuno tech challange
        </Text>
      </Footer>
    </Layout>
  </div>
};

export default App;