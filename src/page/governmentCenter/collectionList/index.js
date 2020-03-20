/**
 *  采集列表
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Table, Input, Row, Col, Button, Select, DatePicker, Breadcrumb } from 'antd';
import { ArrowUpOutlined,ArrowDownOutlined,PlusOutlined,MinusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from 'axios';
import Top from '../../../component/top/index';
import Label from "../../../component/label/index";
import PolicyManagementMenu from "../../../component/policyManagementMenu/index";
import './index.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

class CollectionList extends Component {
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
            labelStatus:{
                title:"状态",
                item:["全部","暂存","已发布"]
            },
            labelSource:{
                title:"来源",
                item:["全部","爬虫","人工"]
            }
        }
        this.columns = [
            {
                title: '政策标题',
                dataIndex: 'title',
                key: 'title',
                width:400,
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
                title: '采集时间',
                key: 'time',
                dataIndex: 'time',
                width:200
            }
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
    setArrdown = () =>{
        this.setState({
            arrdown:!this.state.arrdown
        })
    }
    setArrProduct = () =>{
        this.setState({
            arrdown:!this.state.arrdown
        })
    }
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const {labelProduct,arrProduct,selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="collectionList-template">
                <Top />
                <div className="collectionList-label-box max-weight-box">
                <Row>
                    <Col span={4}>
                        <PolicyManagementMenu />
                    </Col>
                    <Col span={20}>
                    <div className="information-title">采集列表</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>政策管理</Breadcrumb.Item>
                        <Breadcrumb.Item href="">采集列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="label-box">
                        <Row className="mt10">
                            <Col span={2}>政策标题：</Col>
                            <Col span={22}>
                                <Input />
                            </Col>
                        </Row>
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
                        <Row className="mt10">
                            <Col span={2}>发文日期：</Col>
                            <Col span={22}>
                                <RangePicker showTime />
                            </Col>
                        </Row>
                        <div className="collectionList-button">
                            <Button type="primary">检索</Button>
                            <Button className="ml15">重置</Button>
                        </div>
                    </div>
                        <p align="right">
                            <Button type="primary">所属层级/发布机构</Button>
                            <Button type="primary" className="ml15">政策主题</Button>
                            <Button type="primary" className="ml15">应用类型</Button>
                            <Button type="primary" className="ml15">所属行业</Button>
                        </p>
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns} dataSource={this.data} pagination={this.pagination} />
                    </Col>
                </Row>
                </div>
            </div>
        );
    };
}

export default CollectionList;