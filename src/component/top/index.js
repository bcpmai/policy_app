import React, {Component} from 'react';
import {render} from 'react-dom';
import {Input, Button, Row, Col,Menu} from 'antd';
import axios from 'axios';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import './index.css';


const { SubMenu } = Menu;
const { Search } = Input;

class Top extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
            current:"home"
        }
    }

    handleClick = () => {

    }

    render() {
        const { isLogin } = this.state;
        return (
            <div className="top-component-template">
                <Row className="welcome-box">
                    <Col span={12}><div>您好，欢迎光临政策与企业匹配服务平台！</div></Col>
                    {!isLogin ? <Col span={12} className="right-button">
                        <Button type="primary" size="small">登录</Button>
                        <Button size="small" className="ml15">注册</Button>
                    </Col> : <Col span={12} className="right-button"><Button size="small">退出</Button></Col>}

                </Row>
                <Row className="logo-box">
                    <Col span={8}><div className="logo">政策与企业匹配服务平台</div></Col>
                    <Col span={8} offset={8}>
                        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    </Col>
                </Row>
                <div>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                        <Menu.Item key="home">
                            <a href="/index">首页</a>
                        </Menu.Item>
                        <Menu.Item key="new">
                            <a href="latestPolicy">最新政策</a>
                        </Menu.Item>
                        <Menu.Item key="application">
                            <a href="">申报政策</a>
                        </Menu.Item>
                        <Menu.Item key="center">
                            <a href="login">个人中心</a>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    };
}

export default Top;