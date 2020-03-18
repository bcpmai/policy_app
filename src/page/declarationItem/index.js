/**
 * 申报项目
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

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

class DeclarationItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            arrdown:true,
            arrProduct:false,
            labelTheme:{
                    title:"政策主题",
                    item:["全部","综合政策","财税支持","融资促进","市场开拓","服务措施","权益保护","创业扶持","创新支持","监督检查","其他"]
                },
            labelType:
                {
                    title:"应用类型",
                    item:["全部","规范规划类","资金支持类","税费减免类","资质认定类","行业管制类"]
                },
            labelProduct:{
                title:"发布机构",
                item:["全部","国务院","国家发展和改革委员会","工业和信息化部","国务院办公厅","科学技术部","自然资源部","财政部","司法部","人力资源和社会保障部","生态环境部"]
            },
            labelDate:{
                title:"发文日期",
                item:["全部","2020年","2019年","2018年","2017年","2016年","2015年","2014年","2013年","2012年","2011年"]
            }
        }
        this.columns = [
            {
                title: '项目标题',
                dataIndex: 'title',
                key: 'title',
                render: text => <a href="/itemText">{text}</a>,
            },
            {
                title: '应用类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '发布机构',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '扶持金额',
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
                render: (text, record) => (<span><a>立即申报</a><a className="ml15">收藏</a></span>),
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
    setArrdown = () =>{
        this.setState({
            arrdown:!this.state.arrdown
        });
    }
    setArrProduct = () =>{
        this.setState({
            arrProduct:!this.state.arrProduct
        })
    }
    render() {
        const {arrdown,labelTheme,labelType,labelProduct,arrProduct,labelDate} = this.state;
        return (
            <div className="latestPolicy-template">
                <Top />
                <div className="latestPolicy-label-box max-weight-box">
                    <Row className="latestPolicy-serach">
                        <Col span={8}>
                        <Search
                            placeholder="input search text"
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
                        <Label title={labelTheme.title} item={labelTheme.item} key="labelTheme" />
                        <Row className="mt10">
                            <Col span={2}>所属层级：</Col>
                            <Col span={22}>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">全部</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                        </Row>
                        <div className="label-product-box">
                            <Label title={labelProduct.title} item={labelProduct.item} key="labelProduct" />
                            {!arrProduct ? <span onClick={this.setArrProduct} className="more-label"><PlusOutlined /> 展开</span> : <span onClick={this.setArrProduct} className="more-label"><MinusOutlined /> 收起</span> }
                        </div>
                        <Label title={labelType.title} item={labelType.item} key="labelType" />
                        <Row className="mt10">
                            <Col span={2}>所属行业：</Col>
                            <Col span={22}>
                                <Select defaultValue="lucy" style={{ width: 120 }}>
                                    <Option value="jack">全部</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>
                                        Disabled
                                    </Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Label title={labelDate.title} item={labelDate.item} key="labelDate" />
                        {/*<Row className="mt10">*/}
                            {/*<Col span={2}>发文日期：</Col>*/}
                            {/*<Col span={22}>*/}
                                {/*<RangePicker showTime />*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                        <div className="latestPolicy-button">
                            <Button type="primary">检索</Button>
                            <Button className="ml15">重置</Button>
                        </div>
                    </div>
                    <Table columns={this.columns} dataSource={this.data} pagination={this.pagination} />
                </div>
                {/*<Footer footerClass={footerClass}/>*/}
            </div>
        );
    };
}

export default DeclarationItem;