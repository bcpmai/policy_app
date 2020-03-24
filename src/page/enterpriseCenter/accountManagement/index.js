/**
 * 账户管理
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Form, Input, Row, Col} from 'antd';
import { EditOutlined,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import cookie from 'react-cookies';
import Top from '../../../component/top/index';
import './index.css';
import EnterpriseMenu from '../../../component/enterpriseCenterMenu';
import Title from "../../../component/title/index";
import PolicyManagementMenu from "../../../component/policyManagementMenu/index";
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const validateMessages = {
    required: '必填项!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
    number: {
        range: 'Must be between ${min} and ${max}',
    },
};
class AccountManagement extends Component {
    constructor(props){
        super(props);
        this.state = {
            userType:cookie.load('userType')
        }
    }
    onChange = (date, dateString) =>{
        console.log(date, dateString);
    }
    render() {
        return (
            <div className="accountManagement-template">
                <Top />
                <div className="accountManagement-form-box max-weight-box">
                    <Row>
                        <Col span={4}>
                            {this.state.userType == 1 ? <EnterpriseMenu menuKey="accountManagement" /> : <PolicyManagementMenu menu="systemManagement" current="accountManagement" />}
                        </Col>
                        <Col span={20}>
                            <Title name="账户管理" />
                    <div className="accountManagement-form">
                        <div className="accountManagement-title">账号密码修改</div>
                        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                            <Form.Item name='oldPassword' label="原登录密码" rules={[{required: true}]}>
                                <Input.Password placeholder="请输入内容" style={{width:300}}/>
                            </Form.Item>
                            <Form.Item name='password' label="新登录密码" rules={[{required: true}]}>
                                <Input.Password placeholder="字母、数字和符号两种以上的6-25字符组合" style={{width:300}}/>
                            </Form.Item>
                            <Form.Item
                                name={['user', 'introduction']}
                                label="确认登录密码"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请再次输入密码',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject('两次密码不一致!');
                                        },
                                    }),
                                ]}>
                                <Input.Password placeholder="再次输入密码" style={{width:300}}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                <Button type="primary" htmlType="submit">
                                    确认修改
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="accountManagement-title">绑定手机修改</div>
                        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                            <Form.Item name="mobile" label="原绑定手机号" rules={[{required: true}]}>
                                <Input style={{width:300}}/>
                            </Form.Item>
                            <Form.Item label="验证码">
                                <Form.Item name="yzm" noStyle  rules={[{required: true}]}>
                                    <Input min={1} max={10} style={{width:170,marginRight:10}} />
                                </Form.Item>
                                <Button className="ant-form-text"> 获取短信验证码</Button>
                            </Form.Item>
                            <Form.Item name="mobile" label="绑定新手机号码" rules={[{required: true}]}>
                                <Input style={{width:300}}/>
                            </Form.Item>
                            <Form.Item label="验证码">
                                <Form.Item name="yzm" noStyle  rules={[{required: true}]}>
                                    <Input min={1} max={10} style={{width:170,marginRight:10}} />
                                </Form.Item>
                                <Button className="ant-form-text"> 获取短信验证码</Button>
                            </Form.Item>
                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                <Button type="primary" htmlType="submit">
                                    确认修改
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                        </Col>
                    </Row>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default AccountManagement;