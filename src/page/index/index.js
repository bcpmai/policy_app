/**
 * 首页
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Carousel, Row, Col, Button, Divider, Card } from 'antd';
import { BarsOutlined,SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from './../../component/top';
// import Footer from "../../component/footer";
import Label from "../../component/label";

import './index.css';


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 10},
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


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            label:[
                {
                    title:"政策主题",
                    item:["综合政策","财税支持","融资促进","市场开拓","服务措施","权益保护","创业扶持","创新支持","监督检查"]
                },
                {
                    title:"应用类型",
                    item:["规范规划类","资金支持类","税费减免类","资质认定类","行业管制类"]
                },
                {
                    title:"所属行业",
                    item:["A.农、林、牧、渔业","B.采矿业","C.制造业","D.电力、热力、燃气及水生产和供应业","E.建筑业","F.批发和零售业","G.交通运输、仓储和邮政业","H.住宿和餐饮业", "I.信息传输、软件和信息技术服务业","J.金融业","K.房地产业","L.租赁和商务服务业","M.科学研究和技术服务业","N.水利、环境和公共设施管理业", "O.居民服务、修理和其他服务业","P.教育","Q.卫生和社会工作","R.文化、体育和娱乐业","S.公共管理、社会保障和社会组织","T.国际组织"]
                }
            ]
        }
    }
    onFinish = (values) => {
        //发送请求
        axios.post('/company/register',{
            ...values
        })
            .then(function(response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });

    };
    onReset = () => {
        this.props.form.resetFields();
    };
    render() {
        const { label } = this.state;
        return (
            <div className="index-template">
                <Top />
                <div className="index-box max-weight-box">
                    <div className="carousel-box">
                        <Carousel autoplay>
                            <div>
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584423146704&di=582d85ae015e111f469bf01a4c33baa1&imgtype=0&src=http%3A%2F%2Fpic.16pic.com%2F00%2F47%2F28%2F16pic_4728317_b.jpg" />
                            </div>
                            <div>
                                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3881320410,3466024303&fm=26&gp=0.jpg" />
                            </div>
                        </Carousel>
                    </div>
                    <Row className="item-box" >
                        <Col span={12}>
                            <Button shape="round" icon={<SearchOutlined />} size="large">
                                找政策
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button shape="round" icon={<BarsOutlined />} size="large">
                                报项目
                            </Button>
                        </Col>
                    </Row>
                    <div className="matching-box">
                        <Divider>快速匹配</Divider>
                        <div className="matching-label-box">
                            <p>请选择您感兴趣的标签，智能匹配相关申报政策。</p>
                            <div>
                                {label.map((labelItem,labelIdx)=>{
                                    return <Label title={labelItem.title} item={labelItem.item} key={labelIdx} />
                                })}
                                <div className="matching-button">
                                    <Button type="primary" shape="round" size="large">
                                        立即匹配
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="application-box">
                        <Divider>申报政策</Divider>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="关于应对新型冠状病毒肺炎疫情设立渝北区抗击疫情转贷应急周转资金的实施细则" extra={<span>2019-03-15</span>}>
                                    <p><strong>扶持内容：</strong><span>（一）企业申请的单笔转贷应急周转资金额度原则上不超过1000万元（含）。</span></p>
                                    <p>（二）转贷应急周转资金使用时间原则上控制在20个工作日以内。资金使用费按每个工作日0.1‰计算收取，收费不满1个工作日的按1个工作日计算收取。若20个工作日还不能······</p>
                                    <p className="button-center"><Button type="primary" shape="round" >立即申报</Button></p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="关于应对新型冠状病毒肺炎疫情设立渝北区抗击疫情转贷应急周转资金的实施细则" extra={<span>2019-03-15</span>}>
                                    <p><strong>扶持内容：</strong><span>（一）企业申请的单笔转贷应急周转资金额度原则上不超过1000万元（含）。</span></p>
                                    <p>（二）转贷应急周转资金使用时间原则上控制在20个工作日以内。资金使用费按每个工作日0.1‰计算收取，收费不满1个工作日的按1个工作日计算收取。若20个工作日还不能······</p>
                                    <p className="button-center"><Button type="primary" shape="round" >立即申报</Button></p>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="关于应对新型冠状病毒肺炎疫情设立渝北区抗击疫情转贷应急周转资金的实施细则" extra={<span>2019-03-15</span>}>
                                    <p><strong>扶持内容：</strong><span>（一）企业申请的单笔转贷应急周转资金额度原则上不超过1000万元（含）。</span></p>
                                    <p>（二）转贷应急周转资金使用时间原则上控制在20个工作日以内。资金使用费按每个工作日0.1‰计算收取，收费不满1个工作日的按1个工作日计算收取。若20个工作日还不能······</p>
                                    <p className="button-center"><Button type="primary" shape="round" >立即申报</Button></p>
                                </Card>
                            </Col>
                        </Row>
                        <div className="application-more"><a href="/policyList">更多</a></div>
                    </div>
                </div>
            {/*<Footer/>*/}
            </div>
        );
    };
}

export default Register;