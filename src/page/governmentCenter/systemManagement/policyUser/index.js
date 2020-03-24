/**
 *  政府用户
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Table, Input, Row, Col, Button, Breadcrumb } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import Top from '../../../../component/top/index';
// import Footer from "../../../component/footer/index";
import PolicyManagementMenu from "../../../../component/policyManagementMenu/index";
import './index.css';

const { Search } = Input;

class policyUser extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '姓名',
                dataIndex: 'hierarchy',
                key: 'hierarchy'
            },
            {
                title: '手机号',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '注册时间',
                dataIndex: 'theme',
                key: 'theme'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a>修改</a>
                        <a className="ml15">禁用</a>
                        <a className="ml15">重置密码</a>
                    </span>),
            },
        ];

        this.data = [
            {
                key: '1',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type:'资金支持',
                analysis:'-',
                status:'暂存',
                source:'人工',
                time:'2019-02-01 12:05:11',
                money:'张三'
            },
            {
                key: '2',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type:'资金支持',
                analysis:'-',
                status:'暂存',
                source:'人工',
                time:'2019-02-01 12:05:11',
                money:'张三'
            },
            {
                key: '3',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type:'资金支持',
                analysis:'-',
                status:'暂存',
                source:'人工',
                time:'2019-02-01 12:05:11',
                money:'张三'
            },
            {
                key: '4',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type:'资金支持',
                analysis:'-',
                status:'暂存',
                source:'人工',
                time:'2019-02-01 12:05:11',
                money:'张三'
            }
        ];
        function onShowSizeChange(current, pageSize) {
            console.log(current, pageSize);
        }
        this.pagination = {
            showSizeChanger:true,
            defaultCurrent:1,
            total:500,
            pageSizeOptions:['10', '20', '30', '50','100','150'],
            onShowSizeChange:onShowSizeChange
        }
    }
    render() {
        const {arrdown,labelTheme,labelType,labelProduct,arrProduct,labelStatus,labelSource} = this.state;
        return (
            <div className="policyUser-template">
                <Top />
                <div className="policyUser-label-box max-weight-box">
                <Row>
                    <Col span={4}>
                        <PolicyManagementMenu />
                    </Col>
                    <Col span={20}>
                    <div className="information-title">政策用户</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>政策管理</Breadcrumb.Item>
                        <Breadcrumb.Item href="">政策用户</Breadcrumb.Item>
                    </Breadcrumb>
                        <div className="policyUser-search">
                            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                        </div>
                        <p><Link to="/addPolicy"><Button type="primary">添加用户</Button></Link></p>
                    <Table columns={this.columns} dataSource={this.data} pagination={this.pagination} />
                    </Col>
                </Row>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default policyUser;