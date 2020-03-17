import React, {Component} from 'react';
import {render} from 'react-dom';
import {Form, Input, InputNumber, Button, Row, Col, Select} from 'antd';
import axios from 'axios';
import Top from './../../component/top';
import Footer from "../../component/footer";
import './index.css';

const { Option } = Select;
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


class ForgotYour extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    onFinish = (values) => {
        //发送请求
        axios.post('/company/register',{
            ...values
        })
            .then(function(response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
            });

    };
    onReset = () => {
        this.props.form.resetFields();
    };
    render() {
        return (
            <div className="login-template">
                <Top />
                <div className="login-form-box">
                    <div className="login-title">忘记密码</div>
                    <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                        <Form.Item name="username" label="手机号" rules={[{required: true}]}>
                            <Input placeholder="请输入手机号"/>
                        </Form.Item>
                        <Form.Item label="短信验证码">
                            <Form.Item name="yzm" noStyle  rules={[{required: true}]}>
                                <Input placeholder="请输入验证码" min={1} max={10} style={{width:200,marginRight:10}} />
                            </Form.Item>
                            <Button className="ant-form-text"> 获取短信验证码</Button>
                        </Form.Item>
                        <Form.Item name='password' label="登录密码" rules={[{required: true}]}>
                            <Input.Password placeholder="字母、数字和符号两种以上的6-25字符组合"/>
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
                            <Input.Password placeholder="再次输入密码"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{span: 19, offset: 5}} className="login-button">
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                            <p><a href="/login">返回登录</a></p>
                        </Form.Item>
                    </Form>
                </div>
                <Footer/>
            </div>
        );
    };
}

export default ForgotYour;