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
import Logo from './img/logo_copy.png';


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
                case "addPolicy":
                case "collectionList":
                case "login":
                case "register":
                case "forgotYour":
                case "projectList":
                case "roleManagement":
                case "enterprise":
                case "policyUser":
                case "labelManage":
                case "carouselManage":
                case "accountManagement":
                case "myCollection":
                case "information":
                case "matching":
                case "mySubscribe":
                    current = "login";
                        break;
                case "policyText":
                case "latestPolicy":
                    current = "latestPolicy";
                    break;
                case "itemText":
                case "declarationItem":
                    current = "declarationItem";
                    break;

            }
            if(pathName.indexOf("addPolicy") != -1 || pathName.indexOf("policyPreview") != -1){
                current = "login";
            }
            if(pathName.indexOf("policyText") != -1){
                current = "latestPolicy";
            }
        }
        console.log(current,"current");
        this.state = {
            isLogin:cookie.load('userId'),
            userType:cookie.load('userType'),
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
        window.location.href='/login';
    }
    serachLatestPolicy = (keyString) =>{
        window.location.href=`/latestPolicy/${keyString}`
    }

    render() {
        const { isLogin, current, userType } = this.state;
        return (
            <div className="top-component-template">
                <div className="welcome-box">
                <Row className="max-weight-box">
                    <Col span={4}><div>
                        {/*<img src={Logo} style={{width:"35px",marginRIght:"10px",borderRadius: "5px"}} />*/}
                        政策与企业匹配服务平台</div></Col>
                    <Col span={9}>
                        <Menu onClick={this.handleClick} selectedKeys={[current || "home"]} mode="horizontal" theme="dark">
                            <Menu.Item key="home">
                                <a href="/">首页</a>
                            </Menu.Item>
                            <Menu.Item key="latestPolicy">
                                <a href="/latestPolicy">最新政策</a>
                            </Menu.Item>
                            <Menu.Item key="declarationItem">
                                <a href="/declarationItem">申报政策</a>
                            </Menu.Item>
                            <Menu.Item key="login">
                                <a href={isLogin ? (userType == 1 ? "/information" : "/policyList") : "/login"}>个人中心</a>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={8}>
                        <div className="serach"><Search placeholder="请输入关键字查找申报政策" onSearch={this.serachLatestPolicy} enterButton /></div>
                    </Col>
                    {!isLogin ? <Col span={3} className="right-button">
                        <Link to="/login"><Button size="small" icon={<UserOutlined />}>登录</Button></Link>
                        <u className="line-u">|</u>
                        <Link to="/register"><Button size="small" className="ml15 mr15">注册</Button></Link>
                    </Col> : <Col span={3} className="right-button"><span title={cookie.load('userName')}>{cookie.load('userName').length > 10 ? cookie.load('userName').substr(0,10)+"..." : cookie.load('userName')}</span><Button icon={<ExportOutlined />} size="small" className="mr15" onClick={this.removeCookie}>退出</Button></Col>}

                </Row>
                </div>
                {/*<div className={`logo-box ${current!="home" ? 'min-logo-box' : ''}`}>*/}
                {/*<div className='logo-box min-logo-box'>*/}
                    {/*<div className="max-weight-box">*/}
                        {/*<div className="logo">政策与企业匹配服务平台</div>*/}
                        {/*<div className="serach"><Search placeholder="请输入关键字查找申报政策" onSearch={this.serachLatestPolicy} enterButton /></div>*/}
                    {/*</div>*/}
                    {/*<div className='menu-box min-menu-box'>*/}
                        {/*<div className="menu-bg"></div>*/}
                        {/*<Menu onClick={this.handleClick} selectedKeys={[current || "home"]} mode="horizontal" theme="dark">*/}
                            {/*<Menu.Item key="home">*/}
                                {/*<a href="/">首页</a>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="latestPolicy">*/}
                                {/*<a href="/latestPolicy">最新政策</a>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="#">*/}
                                {/*<a href="#">申报政策</a>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="login">*/}
                                {/*<a href={isLogin ? "/policyList" : "/login"}>个人中心</a>*/}
                            {/*</Menu.Item>*/}
                        {/*</Menu>*/}
                    {/*</div>*/}
                {/*</div>*/}

            </div>
        );
    };
}

export default Top;