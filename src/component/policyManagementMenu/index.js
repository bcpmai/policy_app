import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link } from "react-router-dom";
import { Button, Form, Input, InputNumber, Row, Col, Select,DatePicker,Menu} from 'antd';
import axios from 'axios';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import './index.css';


const { SubMenu } = Menu;

class PolicyMenu extends Component {
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
                <Menu
                    style={{ width: 220 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                          <MailOutlined />
                                          <span>政策管理</span>
                                        </span>
                        }
                    >
                        <Menu.Item key="1"><a href="/information" >政策列表</a></Menu.Item>
                        <Menu.Item key="2">采集列表</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                          <MailOutlined />
                                          <span>项目管理</span>
                                        </span>
                        }
                    >
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                          <MailOutlined />
                                          <span>系统管理</span>
                                        </span>
                        }
                    >
                        <Menu.Item key="31"><a href="/information" >角色权限</a></Menu.Item>
                        <Menu.Item key="32">企业用户</Menu.Item>
                        <Menu.Item key="33">政府用户</Menu.Item>
                        <Menu.Item key="34">标签管理</Menu.Item>
                        <Menu.Item key="35">轮播图管理</Menu.Item>
                        <Menu.Item key="36">账户管理</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    };
}

export default PolicyMenu;