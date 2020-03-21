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
import {request} from "../../utils/request";


class PolicyText extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params ? props.match.params.id : null,
            policy:{}
        };
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
    componentDidMount() {
        this.getDefalutData();
    }
    getDefalutData = async() =>{
        const {data} = await request(`/policy/get/${this.state.id}`, 'GET'); //请求默认数据
        this.setState({
            policy:data.policy
        })
    }
    render() {
        const {policy} = this.state;
        const labelStr = policy.label_add_str ? policy.label_add_str.split(",") : null;
        return (
            <div className="policyText-template">
                <Top />
                <div className="policyText-label-box max-weight-box">
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>最新政策</Breadcrumb.Item>
                        <Breadcrumb.Item href="">政策正文</Breadcrumb.Item>
                    </Breadcrumb>
                   <div className="policyText-descriptions">
                       <Descriptions>
                           <Descriptions.Item label="政策标题" span={3}><span>{policy.title}</span></Descriptions.Item>
                           <Descriptions.Item label="发布机构"><span title="重庆市发改委重庆市发改委重庆市发改委">重庆市发改委</span></Descriptions.Item>
                           <Descriptions.Item label="发文日期">{policy.release_date}</Descriptions.Item>
                           <Descriptions.Item label="发文字号">{policy.post_shop_name}</Descriptions.Item>
                           {labelStr ? <Descriptions.Item label="政策标签" span={3} className="labelAdd">
                               {labelStr.map((item,idx)=><Tag key={idx}>{item}</Tag>)}</Descriptions.Item> : null}
                           {labelStr ? <Descriptions.Item label="政策有效期">
                               {policy.life_date}
                           </Descriptions.Item> : null}
                       </Descriptions>
                   </div>
                    <div>
                        <Button type="primary" icon={<StarOutlined />}>收藏</Button>
                    </div>
                    <Row gutter={16} className="policyText-content-box">
                        <Col span={18} className="policyText-content">
                            {/*<p className="policyText-content-title">云南省工业和信息化委关于申报2018年省级工业和信息化发展专项资金(技术改造方向)项目的通知</p>*/}
                            <div className="policyText-content-text">
                                <div dangerouslySetInnerHTML = {{ __html:policy.content }}></div>
                            </div>
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