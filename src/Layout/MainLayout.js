import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import React, {useState} from "react";
import "./MainLayout.css";
import TableData from "../Component/TableData";
import StudentDrawerForm from "../Component/StudentDrawerForm";
import StudentDrawerFormEdit from "../Component/StudentDrawerFormEdit";
const {Header, Sider, Content} = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDrawerEdit, setShowDrawerEdit] = useState(false);
  const [studentData, setStudentData] = useState({});
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <StudentDrawerFormEdit
          showDrawerEdit={showDrawerEdit}
          setShowDrawerEdit={setShowDrawerEdit}
          studentData={studentData}
        />
        <StudentDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
        />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <TableData
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            showDrawerEdit={showDrawerEdit}
            setShowDrawerEdit={setShowDrawerEdit}
            setStudentData={setStudentData}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
