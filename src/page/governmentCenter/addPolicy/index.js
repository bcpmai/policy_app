/**
 *  添加政策
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Input, Row, Col, Button, Select, DatePicker, Breadcrumb,Form,Upload, message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {request} from './../../../utils/request';
import Top from '../../../component/top/index';
import cookie from 'react-cookies';
import PolicyManagementMenu from "../../../component/policyManagementMenu/index";
import './index.css';

import E from 'wangeditor'



const { Option } = Select;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
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

class AddPolicy extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        console.log(this.refs);
        const elem = this.refs.editorElem; //获取editorElem盒子
        //const submit = this.refs.submit; //获取提交按钮
        const editor = new E(elem)  //new 一个 editorElem富文本
        // editor.customConfig.uploadFileName = 'upfile' //置上传接口的文本流字段
        // editor.customConfig.uploadImgServer = 'https://dev.xiaomon.com/api/treeroot/v1/xxx/upload/uploadImage'//服务器接口地址
        // editor.txt.html(this.state.content)  //设置富文本默认内容
         editor.create() //创建
        // editor.customConfig.uploadImgHooks = {
        //     customInsert: function (insertImg, result, editor) {
        //         var url = result.url  //监听图片上传成功更新页面
        //         insertImg(url)
        //     }
        // }
        // submit.addEventListener('click', function () {  //监听点击提交按钮
        //     // 读取 html
        //     this.setState({
        //         content: editor.txt.html()  //获取富文本内容
        //     })
        // }, false)
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
                themeData: themData.data,
                typeData: typeData.data,
                belongData: belongData.data,
                industryData: industryData.data

            })
        }
    }
    onFinish = async (values) => {
        console.log(values);
    }
    belongChange = async (value) => {
        const labelProductData = await request('/common/get-all-organization-label', 'POST', {belong_id: value}); //发布机构
        const productData = labelProductData.data;
        if (productData && productData.success) {
            this.setState({
                productData: productData.data
            })
        }
    }
    onChange = (date, dateString)=> {
        console.log(date, dateString);
    }
    //发文日期
    onDateChange = (date,dateString) =>{
        console.log(date, dateString);
    }
    handleChange = (value) =>{
        console.log(`selected ${value}`);
    }
    handleUploadChange = info => {
        console.log(info,"info")
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };
    render() {
        const {industryData,belongData,themeData,typeData,productData} = this.state;
        const props = {
            action: 'http://106.75.17.129:5000/common/upload-file',
            onChange: this.handleUploadChange,
            multiple: true,
            data:{
                userId:cookie.load("userId"),
                userName:cookie.load("userName"),
                userType:cookie.load("userType"),
            },
            accept:".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,ppt,.pptx,.xls,.xlsx,.pdf,.zip,.rar"
        };
        return (
            <div className="addPolicy-template">
                <Top />
                <div className="addPolicy-label-box max-weight-box">
                <Row>
                    <Col span={4}>
                        <PolicyManagementMenu />
                    </Col>
                    <Col span={20}>
                    <div className="information-title">添加政策</div>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>政策管理</Breadcrumb.Item>
                        <Breadcrumb.Item href="">政策列表</Breadcrumb.Item>
                        <Breadcrumb.Item href="">添加政策</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="label-box">
                        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
                            <Form.Item name="username" label="政策标题" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="company_name" label="发文字号" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name="date" label="发文日期" rules={[{required: true}]}>
                                <DatePicker onChange={this.onDateChange} />
                            </Form.Item>
                            <Form.Item name="mobile" label="所属行业" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange}
                                >
                                    {industryData ? industryData.map((item, idx) => <Option value={item.id}
                                                                                        key={item.id}>{item.name}</Option>) : ''}

                                </Select>
                            </Form.Item>
                            <Form.Item name="username" label="政策主题" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange}
                                >
                                    {themeData ? themeData.map((item, idx) => <Option value={item.id}
                                                                                            key={item.id}>{item.name}</Option>) : ''}

                                </Select>
                            </Form.Item>
                            <Form.Item name="username" label="应用类型" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange}
                                >
                                    {typeData ? typeData.map((item, idx) => <Option value={item.id}
                                                                                      key={item.id}>{item.name}</Option>) : ''}

                                </Select>
                            </Form.Item>
                            <Form.Item name="username" label="所属层级" rules={[{required: true}]}>
                                <Select onChange={this.belongChange}>
                                    {belongData ? belongData.map((item, idx) => <Option value={item.id}
                                                                                            key={item.id}>{item.name}</Option>) : ''}
                                </Select>
                            </Form.Item>
                            <Form.Item name="username" label="发布机构" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange}
                                >
                                    {productData ? productData.map((item, idx) => <Option value={item.id}
                                                                                        key={item.id}>{item.name}</Option>) : ''}
                                </Select>
                            </Form.Item>
                            <Form.Item name="username" label="政策正文" rules={[{required: true}]}>
                                <div ref="editorElem">
                                </div>
                            </Form.Item>
                            <Form.Item name="username" label="上传附件" rules={[{required: true}]}>
                                <Upload {...props} fileList={this.state.fileList}>
                                    <Button>
                                        <UploadOutlined /> Upload
                                    </Button>
                                </Upload>
                                <span>支持扩展名为.doc/.docx/.ppt/.pptx/.xls/.xlsx/.pdf/.zip/.rar，大小不超过100M</span>
                            </Form.Item>
                        </Form>
                        <div className="addPolicy-button">
                            <Button type="primary" htmlType="submit">发布</Button>
                            <Button type="primary" className="ml15">保存</Button>
                            <Button type="primary" className="ml15" onClick={()=>window.location.href="/policyPreview"}>预览</Button>
                            <Button className="ml15">返回</Button>
                        </div>
                    </div>
                    </Col>
                </Row>
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default AddPolicy;