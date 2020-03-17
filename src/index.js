import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./page/index/index.js"; //首页
import Login from "./page/login/index.js"; //登录
import Register from "./page/register/index.js"; //注册
import ForgotYour from "./page/forgotYour/index.js"; //找回密码
import DeclarePush from "./page/declarePush/index.js"; //申报推送
import LatestPolicy from "./page/latestPolicy/index.js"; //最新政策
import PolicyText from "./page/policyText/index.js"; //政策正文
import Information from "./page/information/index.js"; //企业信息
import AccountManagement from "./page/accountManagement/index.js"; //账户管理



ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Index} />
            <Route exact path="/home" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgotYour" component={ForgotYour} />
            <Route exact path="/declarePush" component={DeclarePush} />
            <Route exact path="/latestPolicy" component={LatestPolicy} />
            <Route exact path="/policyText" component={PolicyText} />
            <Route exact path="/accountManagement" component={AccountManagement} />
        </div>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
