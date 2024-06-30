// ProfilePage.jsx

import { EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Layout } from 'antd';
import React, { useState } from 'react';
import Footer from '../../view/partials/Footer/Footer';


const { Header, Content, Sider } = Layout;

const ProfilePage = () => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: 'MINH HIEU',
        address: '123 asdasd, asdas, asdasdasd',
        phone: '01239847656',
        school: 'FPT School',
        age: '20',
        birthday: '2002-01-01',
        studyCode: 'HE163243'
    });

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleFormChange = (changedFields) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...changedFields,
        }));
    };

    const onFinish = () => {
        console.log('Updated Form Data:', formData);
        setEditMode(false);
        // Handle save/update logic here
    };

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 200, borderRadius: "10px" }}>
                            <Card style={{ width: 500 }} cover={<img alt="logo" src={'https://daihoc.fpt.edu.vn/wp-content/uploads/2022/08/dai-hoc-fpt-tp-hcm-1.jpeg'} style={{ height: 300, objectFit: 'cover' }} />}>
                                {editMode ? (
                                    <Form
                                        layout="vertical"
                                        initialValues={formData}
                                        onValuesChange={handleFormChange}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item name="name" label="Name">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="address" label="Address">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="phone" label="Phone">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="school" label="School">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="age" label="Age">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="birthday" label="Birthday">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="studyCode" label="Study Code">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                ) : (
                                    <>
                                        <Card.Meta
                                            title={formData.name}
                                            description={
                                                <>
                                                    <p>Address: {formData.address}</p>
                                                    <p>Phone: {formData.phone}</p>
                                                    <p>School: {formData.school}</p>
                                                    <p>Age: {formData.age}</p>
                                                    <p>Birthday: {formData.birthday}</p>
                                                    <p>Study Code: {formData.studyCode}</p>
                                                </>
                                            }
                                        />
                                    </>
                                )}
                                <Button type="primary" icon={<EditOutlined />} onClick={handleEditMode} style={{ backgroundColor: "#e38d13" }}>
                                    {editMode ? 'Cancel' : 'Edit'}
                                </Button>
                            </Card>
                        </div>
                    </Content>
                </Layout>
                <Footer />
            </Layout>
        </ div >
    );
};

export default ProfilePage;
