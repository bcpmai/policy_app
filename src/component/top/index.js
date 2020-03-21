import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link } from "react-router-dom";
import {Input, Button, Row, Col, Menu} from 'antd';
import cookie from 'react-cookies';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    ExportOutlined
} from '@ant-design/icons';
import './index.css';


const { SubMenu } = Menu;
const { Search } = Input;

class Top extends Component {
    constructor(props){
        super(props);
        const pathName = window.location.pathname;
        let current = "home";
        if(pathName) {
            switch (pathName.replace("/","")) {
                case "policyList":
                    current = "login";
                case "addPolicy":
                    current = "login";
                case "collectionList":
                    current = "login";
                        break;
                case "policyText":
                    current = "latestPolicy";
                case "latestPolicy":
                    current = "latestPolicy";
                    break

            }
        }
        this.state = {
            isLogin:cookie.load('userId'),
            current
        }

        // PolicyList
        // AddPolicy
        // CollectionList
        // {
        //     latestPolicy
        //     information
        // }
        console.log(window.location.pathname ? window.location.pathname.replace("/","") : "home")
    }
    componentWillMount() {}

    handleClick = () => {

    }
    removeCookie = () =>{
        cookie.remove('userId');
        cookie.remove('userName');
        cookie.remove('userType');
        window.location.reload();
    }
    serachLatestPolicy = (keyString) =>{
        window.location.href=`/latestPolicy/${keyString}`
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
                    </Col> : <Col span={12} className="right-button"><Button icon={<ExportOutlined />} size="small" className="mr15" onClick={this.removeCookie}>退出</Button></Col>}

                </Row>
                </div>
                <div className="logo-box">
                    <div className="logo">政策与企业匹配服务平台</div>
                    <div className="serach"><Search placeholder="请输入关键字查找申报政策" onSearch={this.serachLatestPolicy} enterButton /></div>
                    <div className="menu-box">
                        <div className="menu-bg"></div>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current || "home"]} mode="horizontal" theme="dark">
                            <Menu.Item key="home">
                                <a href="/">首页</a>
                            </Menu.Item>
                            <Menu.Item key="latestPolicy">
                                <a href="/latestPolicy">最新政策</a>
                            </Menu.Item>
                            <Menu.Item key="#">
                                <a href="#">申报政策</a>
                            </Menu.Item>
                            <Menu.Item key="login">
                                <a href={isLogin ? "/policyList" : "/login"}>个人中心</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>

            </div>
        );
    };
}

export default Top;