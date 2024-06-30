import React from "react";
import { Form, Input, Button, Select, Card, Flex } from "antd";

const { Option } = Select;

const PostCreate = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Flex justify="center" style={{ width: "100%" }}>
        <Card
          title="Create New Post"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <Form
            form={form}
            name="create_post"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="productName"
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm",
                },
              ]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn danh mục",
                },
              ]}
            >
              <Select placeholder="Chọn danh mục">
                <Option value="category1">Danh mục 1</Option>
                <Option value="category2">Danh mục 2</Option>
                <Option value="category3">Danh mục 3</Option>
                {/* Thêm các tùy chọn khác tại đây */}
              </Select>
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item
              name="campus"
              label="Campus"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập campus",
                },
              ]}
            >
              <Input placeholder="Nhập campus" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại liên hệ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại liên hệ",
                },
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Vui lòng nhập số điện thoại hợp lệ",
                },
              ]}
            >
              <Input placeholder="Nhập số điện thoại liên hệ" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng bài
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div style={{ width: "50px" }}></div>
        <Card
          title="Add Image"
          style={{
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AGzlRpgqlOr5T1dx1m4lzmtwPDBxsGIzZQ&s"
              style={{ width: "100%" }}
            />
            <Button style={{ maxWidth: "200px", margin: "0 auto" }}>
              Upload Image
            </Button>
          </div>
        </Card>
      </Flex>
    </div>
  );
};

export default PostCreate;
