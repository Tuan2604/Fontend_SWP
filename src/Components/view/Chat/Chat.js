// ChatPage.js
import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, List, Input, Button } from "antd";
import Footer from "../../view/partials/Footer/Footer";

const { Header, Content, Sider } = Layout;

const ChatPage = () => {
  // message chứa list các messge
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = [{ id: 1, name: "Tên người đăng", avatarColor: "#f56a00" }];

  useEffect(() => {
    if (selectedContact) {
      const newMessage = {
        id: messages.length + 1,
        text: `Hello, Tôi giúp đc j cho bạn`,
        sender: selectedContact.name,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
    }
  }, [selectedContact]);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setMessages([]);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <div>
      <Layout style={{ minHeight: "85vh" }}>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "90%", borderRight: 0 }}
          >
            {contacts.map((contact) => (
              <Menu.Item
                key={contact.id}
                onClick={() => handleContactClick(contact)}
              >
                <Avatar
                  style={{
                    backgroundColor: contact.avatarColor,
                    marginRight: "10px",
                  }}
                >
                  {contact.name.charAt(0)}
                </Avatar>
                {contact.name}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0, backgroundColor: "#e8ac4c" }}
          >
            {selectedContact && (
              <>
                <Avatar
                  style={{
                    backgroundColor: selectedContact.avatarColor,
                    margin: "10px 15px",
                  }}
                >
                  {selectedContact.name.charAt(0)}
                </Avatar>
                {selectedContact.name}
              </>
            )}
          </Header>
          <Content
            style={{
              margin: "0 16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: "1 1 auto",
                overflowY: "auto",
                padding: "24px",
                background: "#fff",
                maxHeight: "720px",
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      background:
                        message.sender === "user" ? "#e2f7cb" : "#f0f0f0",
                      padding: "10px",
                      borderRadius: "5px",
                      maxWidth: "70%",
                    }}
                  >
                    {/* noi dung */}
                    {message.text}
                    <div
                      style={{
                        fontSize: "11px",
                        textAlign: "right",
                        marginTop: "5px",
                      }}
                    >
                      {/* thoi gian */}
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedContact && (
              <div
                style={{
                  padding: "16px",
                  borderTop: "1px solid #e8e8e8",
                  background: "#fff",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onPressEnter={handleSend}
                  placeholder="Type a message..."
                  style={{ flex: "10", marginRight: "10px" }}
                />
                <Button
                  type="primary"
                  onClick={handleSend}
                  style={{ flex: "2", margin: "0px" }}
                >
                  Send
                </Button>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </div>
  );
};

export default ChatPage;
