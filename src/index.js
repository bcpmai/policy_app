import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ConfigProvider } from 'antd';
import Index from "./page/index/index.js"; //首页
import Login from "./page/login/index.js"; //登录
import Register from "./page/register/index.js"; //注册
import ForgotYour from "./page/forgotYour/index.js"; //找回密码
import DeclarePush from "./page/declarePush/index.js"; //申报推送
import LatestPolicy from "./page/latestPolicy/index.js"; //最新政策
import PolicyText from "./page/policyText/index.js"; //政策正文
import Information from "./page/information/index.js"; //企业信息
import AccountManagement from "./page/accountManagement/index.js"; //账户管理
import PolicyList from "./page/policyList/index.js"; //政策列表
import Footer from "./component/footer";



ReactDOM.render(
    <Router>
        <ConfigProvider locale={zhCN}>
        <div className="main-box">
            <Route exact path="/" component={Index} />
            <Route exact path="/home" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotYour" component={ForgotYour} />
            <Route exact path="/declarePush" component={DeclarePush} />
            <Route exact path="/latestPolicy" component={LatestPolicy} />
            <Route exact path="/policyText" component={PolicyText} />
            <Route exact path="/information" component={Information} />
            <Route exact path="/accountManagement" component={AccountManagement} />
            <Route exact path="/policyList" component={PolicyList} />
        </div>
        </ConfigProvider>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
