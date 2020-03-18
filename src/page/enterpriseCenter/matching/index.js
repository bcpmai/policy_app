/**
 * 精准匹配
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Form, Input, InputNumber, Row, Col, Select,DatePicker,Menu,Table} from 'antd';
//import { EditOutlined } from '@ant-design/icons';
import { EditOutlined,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from '../../../component/top/index';
// import Footer from "../../../component/footer/index";
import './index.css';
import EnterpriseMenu from '../../../component/enterpriseCenterMenu';

const { Option } = Select;
const { SubMenu } = Menu;
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
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

class Matching extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

        this.columns = [
            {
                title: '项目标题',
                dataIndex: 'title',
                key: 'title',
                width:350,
                render: text => <a>{text}</a>,
            },
            {
                title: '应用类型',
                dataIndex: 'hierarchy',
                key: 'hierarchy'
            },
            {
                title: '发布机构',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '扶持金额',
                dataIndex: 'theme',
                key: 'theme'
            },
            {
                title: '申报日期',
                key: 'time',
                dataIndex: 'time',
                width:200
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (<span><a>立即申报</a><a className="ml15">收藏</a></span>),
            },
        ];

        this.data = [
            {
                key: '1',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                hierarchy: "资金支持",
                address: '工业和信息化部',
                theme: '10万',
                time:'2019-02-01 12:05:11'
            },
            {
                key: '2',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                hierarchy: "资金支持",
                address: '工业和信息化部',
                theme: '10万',
                time:'2019-02-01 12:05:11'
            },
            {
                key: '3',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                hierarchy: "资金支持",
                address: '工业和信息化部',
                theme: '10万',
                time:'2019-02-01 12:05:11'
            },
            {
                key: '4',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                hierarchy: "资金支持",
                address: '工业和信息化部',
                theme: '10万',
                time:'2019-02-01 12:05:11'
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
    onChange = (date, dateString) =>{
        console.log(date, dateString);
    }
    render() {
        return (
            <div className="matching-template">
                <Top />
                <div className="matching-form-box max-weight-box">
                    <Row>
                        <Col span={4}>
                            <EnterpriseMenu menuKey="matching"/>
                        </Col>
                        <Col span={20}>
                    <div className="matching-title">精准匹配</div>
                    <div className="matching-title-h1">
                        <span>您可完善企业信息，精准匹配申报政策</span>
                        <Button type="primary" className="button-matching">精准匹配</Button>
                        <Button type="primary" icon={<EditOutlined />} className="button-edit">完善信息</Button>
                    </div>
                            <Table columns={this.columns} dataSource={this.data} pagination={this.pagination} />
                        </Col>
                    </Row>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default Matching;