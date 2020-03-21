/**
 * 政策正文
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Breadcrumb,Descriptions,Tag,Button,Row,Col,Card,List} from 'antd';
import { StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from './../../component/top';
// import Footer from "../../component/footer";
import './index.css';


class PolicyText extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.listData = [
            {
                title: '国家企业技术中心认定管理办法',
                time:'2016-02-26',
                link:'/itemText'
            },
            {
                title: '工业和信息化部关于申报2019年工业和信息化领域公共服务能力提升专项的通知',
                time:'2016-02-26',
                link:'/itemText'
            },
            {
                title: '关于申报2019年科研机构绩效激励引导专项的通知',
                time:'2016-02-26',
                link:'/itemText'
            },
        ];
    }
    render() {
       // const {arrdown,labelTheme,labelType,labelProduct,arrProduct} = this.state;
        return (
            <div className="policyText-template">
                <Top />
                <div className="policyText-label-box max-weight-box">
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>最新政策</Breadcrumb.Item>
                        <Breadcrumb.Item href="">政策正文</Breadcrumb.Item>
                    </Breadcrumb>
                   <div className="policyText-descriptions">
                    <Descriptions title="政策标题：重庆市发改委关于申报2018年XXXXX专项资金的通知">
                        <Descriptions.Item label="发布机构"><span title="重庆市发改委重庆市发改委重庆市发改委">重庆市发改委</span></Descriptions.Item>
                        <Descriptions.Item label="发文日期">2018-04-13</Descriptions.Item>
                        <Descriptions.Item label="发文字号"></Descriptions.Item>
                        <Descriptions.Item label="政策标签" span={3}><Tag>重庆市级</Tag><Tag>资金扶持</Tag><Tag>技术改造</Tag></Descriptions.Item>
                        <Descriptions.Item label="政策有效期">
                            2019-04-13
                        </Descriptions.Item>
                    </Descriptions>
                   </div>
                    <div>
                        <Button type="primary" icon={<StarOutlined />}>收藏</Button>
                    </div>
                    <Row gutter={16} className="policyText-content-box">
                        <Col span={18} className="policyText-content">
                            <p className="policyText-content-title">云南省工业和信息化委关于申报2018年省级工业和信息化发展专项资金(技术改造方向)项目的通知</p>
                            <div className="policyText-content-text">这里是内容</div>
                        </Col>
                        <Col span={6}>
                            <Card title="申报政策">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.listData}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<a href={item.link}>{item.title}</a>}
                                                description={item.time}
                                            />
                                        </List.Item>
                                    )}
                                />,
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default PolicyText;