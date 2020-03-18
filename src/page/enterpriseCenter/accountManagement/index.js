/**
 * 账户管理
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Form, Input, InputNumber, Row, Col, Select,DatePicker,Menu} from 'antd';
//import { EditOutlined } from '@ant-design/icons';
import { EditOutlined,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from '../../../component/top/index';
// import Footer from "../../../component/footer/index";
import './index.css';
import EnterpriseMenu from '../../../component/enterpriseCenterMenu';

const { Option } = Select;
const { SubMenu } = Menu;
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

        }
    }
    onChange = (date, dateString) =>{
        console.log(date, dateString);
    }
    render() {
        return (
            <div className="information-template">
                <Top />
                <div className="information-form-box max-weight-box">
                    <Row>
                        <Col span={4}>
                            <EnterpriseMenu menuKey="accountManagement" />
                        </Col>
                        <Col span={20}>
                    <div className="information-title">账户管理</div>
                    <div className="information-form">
                        <div className="information-title">账号密码修改</div>
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
                        <div className="information-title">绑定手机修改</div>
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