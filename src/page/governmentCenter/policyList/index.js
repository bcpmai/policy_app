/**
 *  政策列表
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Table, Tag, Input, Row, Col, Button, Select, DatePicker, Breadcrumb} from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined, PlusOutlined, MinusOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {request} from './../../../utils/request';
import Top from '../../../component/top/index';
import Label from "../../../component/label/index";
import Title from "../../../component/title/index";
import PolicyManagementMenu from "../../../component/policyManagementMenu/index";
import './index.css';

const {Search} = Input;
const {Option} = Select;
const {RangePicker} = DatePicker;

class PolicyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrdown: true,
            arrProduct: false,
            // labelTheme:{
            //         title:"政策主题",
            //         item:["全部","综合政策","财税支持","融资促进","市场开拓","服务措施","权益保护","创业扶持","创新支持","监督检查","其他"]
            //     },
            // labelType:
            //     {
            //         title:"应用类型",
            //         item:["全部","规范规划类","资金支持类","税费减免类","资质认定类","行业管制类"]
            //     },
            // labelProduct:{
            //     title:"发布机构",
            //     item:["全部","国务院","国家发展和改革委员会","工业和信息化部","国务院办公厅","科学技术部","自然资源部","财政部","司法部","人力资源和社会保障部","生态环境部"]
            // },
            labelStatus: {
                title: "状态",
                item: [
                    {
                        id: 0,
                        name: "全部"
                    },
                    {
                        id: 1,
                        name: "暂存"
                    },
                    {
                        id: 2,
                        name: "已发布"
                    }]
            },
            labelSource: {
                title: "来源",
                item: [ {
                    id: 0,
                    name: "全部"
                },
                    {
                        id: 1,
                        name: "爬虫"
                    },
                    {
                        id: 2,
                        name: "人工"
                    }]
            }
        }
        this.columns = [
            {
                title: '政策标题',
                dataIndex: 'title',
                key: 'title',
                width: 200,
                render: text => <a>{text}</a>,
            },
            {
                title: '所属层级',
                dataIndex: 'hierarchy',
                key: 'hierarchy'
            },
            {
                title: '发布机构',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '政策主题',
                dataIndex: 'theme',
                key: 'theme'
            },
            {
                title: '应用类型',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '关联解析',
                dataIndex: 'analysis',
                key: 'analysis'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '来源',
                dataIndex: 'source',
                key: 'source'
            },
            {
                title: '操作时间',
                key: 'time',
                dataIndex: 'time',
                width: 130
            },
            {
                title: '操作人员',
                key: 'money',
                dataIndex: 'money'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (<span><a>编辑</a><a className="ml15">删除</a></span>),
            },
        ];

        this.data = [
            {
                key: '1',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type: '资金支持',
                analysis: '-',
                status: '暂存',
                source: '人工',
                time: '2019-02-01 12:05:11',
                money: '张三'
            },
            {
                key: '2',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type: '资金支持',
                analysis: '-',
                status: '暂存',
                source: '人工',
                time: '2019-02-01 12:05:11',
                money: '张三'
            },
            {
                key: '3',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type: '资金支持',
                analysis: '-',
                status: '暂存',
                source: '人工',
                time: '2019-02-01 12:05:11',
                money: '张三'
            },
            {
                key: '4',
                title: '关于修订《纳税服务投诉管理办法》的公告',
                hierarchy: "国家",
                address: '国务院',
                theme: '税收政策',
                type: '资金支持',
                analysis: '-',
                status: '暂存',
                source: '人工',
                time: '2019-02-01 12:05:11',
                money: '张三'
            }
        ];

        function onShowSizeChange(current, pageSize) {
            console.log(current, pageSize);
        }

        this.pagination = {
            showSizeChanger: true,
            defaultCurrent: 1,
            total: 500,
            pageSizeOptions: ['10', '20', '30', '50', '100', '150'],
            onShowSizeChange: onShowSizeChange
        }
    }

    async componentWillMount() {
        const labelThemeData = await request('/common/get-all-policy-theme-label', 'POST'); //政策主题
        const labelTypeData = await request('/common/get-all-use-type-label', 'POST'); //应用类型
        const selectBelongData = await request('/common/get-all-belong-label', 'POST'); //所属层级
        const selectIndustryData = await request('/common/get-all-industry-label', 'POST'); //所属行业


        const themData = labelThemeData.data;
        const typeData = labelTypeData.data;
        const belongData = selectBelongData.data;
        const industryData = selectIndustryData.data;

        if (themData && themData.success && typeData && themData.success && belongData && belongData.success && industryData && industryData.success) {
            const allItem = {id: 0,name: "全部"};
            themData.data.unshift(allItem);
            typeData.data.unshift(allItem);
            belongData.data.unshift(allItem);
            industryData.data.unshift(allItem);
            this.setState({
                labelTheme: {
                    title: "政策主题",
                    item: themData.data
                },
                labelType: {
                    title: "应用类型",
                    item: typeData.data
                },
                belongData: belongData.data,
                industryData: industryData.data

            })
        }
    }

    setArrdown = () => {
        this.setState({
            arrdown: !this.state.arrdown
        })
    }
    setArrProduct = () => {
        this.setState({
            arrProduct: !this.state.arrProduct
        })
    }
    belongChange = async (value) => {
        const labelProductData = await request('/common/get-all-organization-label', 'POST', {belong_id: value}); //发布机构
        const productData = labelProductData.data;
        if (productData && productData.success) {
            this.setState({
                labelProduct: {
                    title: "发布机构",
                    item: productData.data
                }
            })
        }
    }

    render() {
        const {arrdown, labelTheme, labelType, labelProduct, arrProduct, labelStatus, labelSource, belongData, industryData} = this.state;
        return (
            <div className="policyList-template">
                <Top/>
                <div className="policyList-label-box max-weight-box">
                    <Row>
                        <Col span={4}>
                            <PolicyManagementMenu/>
                        </Col>
                        <Col span={20}>
                            <Title name="政策列表" />
                            <Breadcrumb separator=">">
                                <Breadcrumb.Item>政策管理</Breadcrumb.Item>
                                <Breadcrumb.Item href="">政策列表</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="label-box">
                                <Row className="mt10">
                                    <Col span={2}>政策标题：</Col>
                                    <Col span={22}>
                                        <Input/>
                                    </Col>
                                </Row>
                                {labelTheme ?
                                    <Label title={labelTheme.title} item={labelTheme.item} key="labelTheme"/> : ''}
                                <Row className="mt10">
                                    <Col span={2}>所属层级：</Col>
                                    <Col span={22}>
                                        <Select style={{width: 300}} onChange={this.belongChange}>
                                            {belongData ? belongData.map((item, idx) => <Option value={item.id}
                                                                                                key={item.id}>{item.name}</Option>) : ''}
                                        </Select>
                                    </Col>
                                </Row>
                                <div className="label-product-box">
                                    {labelProduct ?
                                        <Label title={labelProduct.title} item={labelProduct.item} key="labelProduct"
                                               span={21} className={arrProduct ? "allLabel" : "minLabel"}/> : ''}
                                    {labelProduct ? (!arrProduct ? <span onClick={this.setArrProduct}
                                                                         className="more-label"><PlusOutlined/> 展开</span> :
                                        <span onClick={this.setArrProduct}
                                              className="more-label"><MinusOutlined/> 收起</span>) : ''}
                                </div>
                                {labelType ?
                                    <Label title={labelType.title} item={labelType.item} key="labelType"/> : ''}
                                <Row className="mt10">
                                    <Col span={2}>所属行业：</Col>
                                    <Col span={22}>
                                        <Select style={{width: 300}}>
                                            {industryData ? industryData.map((item, idx) => <Option value={item.id}
                                                                                                    key={item.id}>{item.name}</Option>) : ''}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row className="mt10">
                                    <Col span={2}>发文日期：</Col>
                                    <Col span={22}>
                                        <RangePicker showTime/>
                                    </Col>
                                </Row>
                                <Label title={labelStatus.title} item={labelStatus.item} key="labelStatus"/>
                                <Label title={labelSource.title} item={labelSource.item} key="labelSource"/>
                                <div className="policyList-button">
                                    <Button type="primary">检索</Button>
                                    <Button className="ml15">重置</Button>
                                </div>
                            </div>
                            <p align="right"><Link to="/addPolicy"><Button type="primary">添加政策</Button></Link></p>
                            <Table columns={this.columns} dataSource={this.data} pagination={this.pagination}/>
                        </Col>
                    </Row>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default PolicyList;