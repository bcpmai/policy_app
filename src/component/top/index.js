import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link } from "react-router-dom";
import {Input, Button, Row, Col, Menu} from 'antd';
import axios from 'axios';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined
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
                <div className="welcome-box">
                <Row className="max-weight-box">
                    <Col span={12}><div>您好，欢迎光临政策与企业匹配服务平台！</div></Col>
                    {!isLogin ? <Col span={12} className="right-button">
                        <Link to="/login"><Button size="small" icon={<UserOutlined />}>登录</Button></Link>
                        <u className="line-u">|</u>
                        <Link to="/register"><Button size="small" className="ml15 mr15">注册</Button></Link>
                    </Col> : <Col span={12} className="right-button"><Button size="small" className="mr15">退出</Button></Col>}

                </Row>
                </div>
                <div className="logo-box">
                    <div className="logo">政策与企业匹配服务平台</div>
                    <div className="serach"><Search placeholder="请输入关键字查找相关政策" onSearch={value => console.log(value)} enterButton /></div>
                    <div className="menu-box">
                        <div className="menu-bg"></div>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                            <Menu.Item key="home">
                                <a href="/">首页</a>
                            </Menu.Item>
                            <Menu.Item key="new">
                                <a href="/latestPolicy">最新政策</a>
                            </Menu.Item>
                            <Menu.Item key="application">
                                <a href="/declarationItem">申报政策</a>
                            </Menu.Item>
                            <Menu.Item key="center">
                                <a href="/information">个人中心</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>

            </div>
        );
    };
}

export default Top;