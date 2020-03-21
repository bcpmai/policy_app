/**
 * 最新政策
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Table, Tag, Input, Row, Col, Button, Select, DatePicker } from 'antd';
import { ArrowUpOutlined,ArrowDownOutlined,PlusOutlined,MinusOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from './../../component/top';
// import Footer from "../../component/footer";
import Label from "../../component/label";
import './index.css';
import {request} from "../../utils/request";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

class LatestPolicy extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrdown:true,
            arrProduct:false
        }
        this.columns = [
            {
                title: '政策标题',
                dataIndex: 'title',
                key: 'title',
                render: text => <a href="/policyText">{text}</a>,
            },
            {
                title: '发布机构',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '发文字号',
                key: 'money',
                dataIndex: 'money'
            },
            {
                title: '发文日期',
                key: 'time',
                dataIndex: 'time'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (<span><a>收藏</a></span>),
            },
        ];

        this.data = [
            {
                key: '1',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                type: "资金支持",
                address: '工业和信息化部',
                money: '10万',
                time:'2019-08-28至2020-03-14'
            },
            {
                key: '2',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                type: "资金支持",
                address: '工业和信息化部',
                money: '10万',
                time:'2019-08-28至2020-03-14'
            },
            {
                key: '3',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                type: "资金支持",
                address: '工业和信息化部',
                money: '10万',
                time:'2019-08-28至2020-03-14'
            },
            {
                key: '4',
                title: '科技部国际合作司关于征集2020年度中国亚太经合组织合作基金项目的通知',
                type: "资金支持",
                address: '工业和信息化部',
                money: '10万',
                time:'2019-08-28至2020-03-14'
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
    setArrdown = () =>{
        this.setState({
            arrdown:!this.state.arrdown
        },()=>{
            if(document.body.clientHeight>document.getElementById("main").offsetHeight) {
                console.log(document.body.clientHeight)
                this.setState({
                    footerClass: {top: document.body.clientHeight-70,position: "absolute",left:0,width: "100%"}
                });
            }else{
                this.setState({
                    footerClass: {position: "inherit"}
                });
            }
        });

    }
    setArrProduct = () =>{
        this.setState({
            arrProduct:!this.state.arrProduct
        })
    }
    render() {
        const {arrdown,labelType,labelProduct,arrProduct,belongData,industryData,labelTheme} = this.state;
        return (
            <div className="latestPolicy-template">
                <Top />
                <div className="latestPolicy-label-box max-weight-box">
                    <Row className="latestPolicy-serach">
                        <Col span={12}>
                        <Search
                            enterButton="查询"
                            size="large"
                            onSearch={value => console.log(value)}
                        />
                        </Col>
                        <Col span={8} className="serach-arrow">
                            {arrdown ? <span onClick={this.setArrdown}>收起筛选<ArrowUpOutlined /></span> : <span onClick={this.setArrdown}>展开筛选<ArrowDownOutlined /></span>}
                        </Col>
                    </Row>
                    <div className="label-box" style={!arrdown ? {display:"none"} : {}}>
                        {labelTheme ?
                            <Label span={{title:4,label:20}} title={labelTheme.title} item={labelTheme.item} key="labelTheme"/> : ''}
                        <Row className="mt10">
                                <Col span={4}>所属层级</Col>
                                <Col span={20}>
                                    <Select style={{width: 300}} onChange={this.belongChange}>
                                        {belongData ? belongData.map((item, idx) => <Option value={item.id}
                                                                                            key={item.id}>{item.name}</Option>) : ''}
                                    </Select>
                                </Col>
                            </Row>
                        <div className="label-product-box">
                            {labelProduct ?
                                <Label title={labelProduct.title} item={labelProduct.item} key="labelProduct"
                                       span={{title:4,label:20}} className={arrProduct ? "allLabel" : "minLabel"}/> : ''}
                            {labelProduct ? (!arrProduct ? <span onClick={this.setArrProduct}
                                                                 className="more-label"><PlusOutlined/> 展开</span> :
                                <span onClick={this.setArrProduct}
                                      className="more-label"><MinusOutlined/> 收起</span>) : ''}
                        </div>
                        {labelType ?
                            <Label span={{title:4,label:20}} title={labelType.title} item={labelType.item} key="labelType"/> : ''}
                        <Row className="mt10">
                            <Col span={4}>所属行业</Col>
                            <Col span={20}>
                                <Select style={{width: 300}}>
                                    {industryData ? industryData.map((item, idx) => <Option value={item.id}
                                                                                            key={item.id}>{item.name}</Option>) : ''}
                                </Select>
                            </Col>
                        </Row>
                        <Row className="mt10">
                            <Col span={4}>发文日期</Col>
                            <Col span={20}>
                                <RangePicker showTime />
                            </Col>
                        </Row>
                        <div className="latestPolicy-button">
                            <Button type="primary">检索</Button>
                            <Button className="ml15">重置</Button>
                        </div>
                    </div>
                    <Table columns={this.columns} dataSource={this.data} pagination={this.pagination} />
                </div>
            </div>
        );
    };
}

export default LatestPolicy;