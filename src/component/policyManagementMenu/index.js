import React, {Component} from 'react';
import {render} from 'react-dom';
import {Menu,Affix} from 'antd';
import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    DesktopOutlined,
    ProfileOutlined

} from '@ant-design/icons';
import './index.css';


const { SubMenu } = Menu;

class PolicyMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
            current:props.current || "policyList"
        }
    }

    handleClick = () => {

    }

    render() {
        const { isLogin,current } = this.state;
        return (
            <div className="policy-menu-component-template">
                <Affix>
                <Menu
                    style={{ width: 200 }}
                    defaultSelectedKeys={[current]}
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
                        <Menu.Item key="policyList"><a href="/policyList" >政策列表</a></Menu.Item>
                        <Menu.Item key="collectionList"><a href="/collectionList">采集列表</a></Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="projectList"
                        className="project-management">
                            <a href="/projectList"><ProfileOutlined />项目管理</a>
                    </Menu.Item>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                          <DesktopOutlined />
                                          <span>系统管理</span>
                                        </span>
                        }
                    >
                        <Menu.Item key="31"><a href="/RoleManagement">角色权限</a></Menu.Item>
                        <Menu.Item key="32"><a href="/enterprise">企业用户</a></Menu.Item>
                        <Menu.Item key="33"><a href="/policyUser">政府用户</a></Menu.Item>
                        <Menu.Item key="34">标签管理</Menu.Item>
                        <Menu.Item key="35">轮播图管理</Menu.Item>
                        <Menu.Item key="36">账户管理</Menu.Item>
                    </SubMenu>
                </Menu>
                </Affix>
            </div>
        );
    };
}

export default PolicyMenu;