/**
 * 我的订阅
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Form, Input, InputNumber, Row, Col, Select,DatePicker,Menu,Table,Tabs} from 'antd';
//import { EditOutlined } from '@ant-design/icons';
import { EditOutlined,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from '../../../component/top/index';
// import Footer from "../../../component/footer/index";
import './index.css';
import EnterpriseMenu from '../../../component/enterpriseCenterMenu';
import Title from "../../../component/title/index";

const { Option } = Select;
const { SubMenu } = Menu;
const { TabPane } = Tabs;
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

class MySubscribe extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: 'top',
            tabTitle:['综合政策','创业扶持','市场/行业准入','技术改造','资金支持','资质认定','综合政策','创业扶持','市场/行业准入','技术改造','资金支持','资质认定','综合政策','创业扶持','市场/行业准入','技术改造','资金支持','资质认定']
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
    handleModeChange = e => {
        const mode = e.target.value;
        this.setState({ mode });
    };
    render() {
        const {mode,tabTitle} = this.state;
        return (
            <div className="mySubscribe-template">
                <Top />
                <div className="mySubscribe-form-box max-weight-box">
                    <Row>
                        <Col span={4}>
                            <EnterpriseMenu menuKey="mySubscribe" />
                        </Col>
                        <Col span={20}>
                        <Title name="我的订阅" />
                    <div>
                        <Tabs defaultActiveKey="1" tabPosition={mode}>
                            {tabTitle.map((item,idx) => (
                                <TabPane tab={item} key={idx}>
                                    Content of tab {idx}
                                </TabPane>
                            ))}
                        </Tabs>
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

export default MySubscribe;