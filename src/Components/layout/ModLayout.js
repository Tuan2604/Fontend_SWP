import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { MdApartment } from "react-icons/md";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hook/useAuth";

const { Header, Sider, Content } = Layout;

const ModLayout = ({ children, showHeader = true }) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleNavigate = (path) => {
    navigate(`/moderator/${path}`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ maxWidth: "300px", width: "300px", minWidth: "300px" }}
      >
        <div className="demo-logo-vertical" style={{ padding: "30px" }}>
          <div className="logoDiv">
            <h1
              style={{
                color: "rgba(255, 255, 255, 0.65)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MdApartment
                className="icon"
                style={{ color: "rgba(255, 255, 255, 0.65)" }}
              />
              FPT Trader
            </h1>
          </div>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => handleNavigate("browser-post")}
          >
            Product Post List
          </Menu.Item>

          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => handleNavigate("dashboard2")}
          >
            DashBoard
          </Menu.Item>

          <Menu.Item
            key="logout"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {showHeader && (
          <Header
            className="site-layout-background"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
        )}
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ModLayout;
