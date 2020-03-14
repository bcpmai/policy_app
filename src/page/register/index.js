import React, {Component} from 'react';
import {render} from 'react-dom';
import {Form, Input, InputNumber, Button, Row, Col} from 'antd';
import axios from 'axios';
// import './index.sass';


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 10},
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

const instance = axios.create({
    baseURL: 'http://192.168.1.97:5000',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    onFinish = (values) => {
        //发送请求
        axios.get('http://192.168.1.97:5000/company/register')
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
            <div className="register-template">
            <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="用户名" rules={[{required: true}]}>
                    <Input placeholder="字母、数字和符号的6-16字符组合"/>
                </Form.Item>
                <Form.Item name={['user', 'email']} label="企业名称" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={['user', 'age']} label="手机号" rules={[{required: true}]}>
                    <InputNumber/>
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
                <Form.Item label="短信验证码">
                    <Form.Item name="短信验证码" noStyle  rules={[{required: true}]}>
                        <InputNumber min={1} max={10} />
                    </Form.Item>
                    <Button className="ant-form-text"> 获取短信验证码</Button>
                </Form.Item>

                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                    <Button type="primary" htmlType="submit">
                        立即注册
                    </Button>
                    <Button htmlType="submit" className="ml15" onClick={this.onReset}>
                        返回
                    </Button>
                </Form.Item>
            </Form>
            </div>
        );
    };
}

export default Register;