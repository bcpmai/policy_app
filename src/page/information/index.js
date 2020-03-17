import React, {Component} from 'react';
import {render} from 'react-dom';
import { Button, Form, Input, InputNumber, Row, Col, Select,DatePicker,Menu} from 'antd';
//import { EditOutlined } from '@ant-design/icons';
import { EditOutlined,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from './../../component/top';
import Footer from "../../component/footer";
import './index.css';

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

class Information extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    onChange = (date, dateString) =>{
        console.log(date, dateString);
    }
    render() {
        return (
            <div className="information-template">
                <Top />
                <div className="information-form-box max-weight-box">
                    <Row>
                        <Col span={4}>
                            <Menu
                                style={{ width: 220 }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                          <MailOutlined />
                                          <span>个人中心</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="1"><a href="/information" >企业信息</a></Menu.Item>
                                    <Menu.Item key="2">精准匹配</Menu.Item>
                                    <Menu.Item key="3">我的订阅</Menu.Item>
                                    <Menu.Item key="4">我的收藏</Menu.Item>
                                    <Menu.Item key="5"><a href="/accountManagement" >账户管理</a></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Col>
                        <Col span={20}>
                    <div className="information-title">企业信息</div>
                    <div className="information-title-h1">
                        <span>您可完善企业信息，精准匹配申报政策</span>
                        <Button type="primary" className="button-matching">精准匹配</Button>
                        <Button type="primary" icon={<EditOutlined />} className="button-edit">编辑</Button>
                    </div>
                    <div className="information-form">
                        <div className="information-title">基本信息</div>
                        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="企业名称">
                                        <Input disabled placeholder="请输入用户名" defaultValue="云南数联铭品科技有限公司"/>
                                    </Form.Item>
                                </Col>
                                <Col span={14}>
                                    <Form.Item name="username" label="注册地址">
                                        <Select placeholder="请选择省份" style={{width:142}}>
                                            <Option value="jack">1</Option>
                                            <Option value="lucy">2</Option>
                                            <Option value="Yiminghe">3</Option>
                                        </Select>
                                        <Select placeholder="请选择市" style={{width:142,marginLeft:5}}>
                                            <Option value="jack">1</Option>
                                            <Option value="lucy">2</Option>
                                            <Option value="Yiminghe">3</Option>
                                        </Select>
                                        <Select placeholder="请选择区县" style={{width:142,marginLeft:5}}>
                                            <Option value="jack">1</Option>
                                            <Option value="lucy">2</Option>
                                            <Option value="Yiminghe">3</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="成立时间">
                                        <DatePicker onChange={this.onChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={14}>
                                    <Form.Item name="username" label="所属行业" rules={[{required: true}]}>
                                        <Select placeholder="请选择所属行业">
                                            <Option value="jack">1</Option>
                                            <Option value="lucy">2</Option>
                                            <Option value="Yiminghe">3</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="information-title">知识产权情况</div>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="知识产权数量">
                                        <Input suffix="个" style={{width:200}} />
                                    </Form.Item>
                                </Col>
                                <Col span={14}>
                                    <Form.Item name="username" label="其中，发明专利数量">
                                        <Input suffix="个" style={{width:200}} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="information-title">财务数据情况</div>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="研发投入">
                                        <Input suffix="万元" style={{width:200}} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="企业报税收入">
                                        <Input suffix="万元" style={{width:200}} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="研发资产总额">
                                        <Input suffix="万元" style={{width:200}} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div className="information-title">人员情况</div>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="最近一年缴纳社保人数">
                                        <Input suffix="人" style={{width:200}} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={10}>
                                    <Form.Item name="username" label="研发人员">
                                        <Input suffix="人" style={{width:200}} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        );
    };
}

export default Information;