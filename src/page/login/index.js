/**
 * 登录
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Form, Input, InputNumber, Button, Row, Col, Select} from 'antd';
import axios from 'axios';
import Top from './../../component/top';
// import Footer from "../../component/footer";
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


class Login extends Component {
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
                    <div className="login-title">用户登录</div>
                    <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                        <Form.Item name="username" label="用户名" rules={[{required: true}]}>
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>
                        <Form.Item name='password' label="登录密码" rules={[{required: true}]}>
                            <Input.Password placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{span: 19, offset: 5}} className="login-button">
                            <p><a href="/forgotYour">忘记密码？</a></p>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            <p><a href="/register">免费注册</a></p>
                        </Form.Item>
                    </Form>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default Login;