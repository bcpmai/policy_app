/**
 *  添加项目
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Input, Row, Col, Button, Select, DatePicker, Breadcrumb,Form,Upload, message, Modal, Table, Tooltip, Checkbox, Switch} from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import {request} from '../../../../utils/request';
import Top from '../../../../component/top/index';
import cookie from 'react-cookies';
import PolicyManagementMenu from "../../../../component/policyManagementMenu/index";
import Title from "../../../../component/title/index";
import './index.css';

import E from 'wangeditor'



const { Option } = Select;
const {Search,TextArea} = Input;
const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
};

const uploadUrl = 'http://web.js.policy.com/api/common/upload-file';

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



class AddProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:props.match.params ? props.match.params.id : null,
            policyVisible:false
        }
    }

    componentDidMount(){
        const elem = this.refs.editorElem; //获取editorElem盒子
        //const submit = this.refs.submit; //获取提交按钮
        const editor = new E(elem)  //new 一个 editorElem富文本
        editor.customConfig.uploadFileName = 'file'; //置上传接口的文本流字段
        editor.customConfig.uploadImgServer = uploadUrl;//服务器接口地址
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }
        editor.create() //创建
        this.getDefalutData(editor);
        this.columns = [
            {
                title: '政策标题',
                dataIndex: 'title',
                key: 'title',
                width: 180,
                render: (text, record) => {
                    return <Tooltip placement="topLeft" title={text}><a onClick={()=>this.props.history.push(`/policyPreview/${record.id}`)}>{text.length < 15 ? text : text.substr(0,15)+"..."}</a></Tooltip>
                }
            },
            {
                title: '发布机构',
                dataIndex: 'organization_label_str',
                key: 'organization_label_str',
                render: (text, record) => {
                    return <Tooltip placement="topLeft" title={text}><span>{text.length < 6 ? text : text.substr(0,6)+"..."}</span></Tooltip>
                }
            },
            {
                title: '发文日期',
                key: 'updated_date',
                dataIndex: 'updated_date',
                width: 130
            },
            {
                title: '操作',
                key: 'action',
                width:120,
                render: (text, record) => (<p align="center"><a onClick={()=>this.props.history.push(`/addPolicy/${record.id}`)}>编辑</a><a onClick={()=>this.showModal(record.id)} className="ml15">删除</a></p>),
            },
        ];

    }
    getDefalutData = async(editor) =>{
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
        //编辑时，获取默认值
        if(this.state.id){
            const {data} = await request(`/policy/get/${this.state.id}`, 'GET'); //请求默认数据
            if(data){
                const {policy} = data;
                this.setState({
                    data,
                    release_date:policy.release_date,
                    content:policy.content
                });
                policy.release_date = moment(policy.release_date, 'YYYY-MM-DD');
                policy.life_date = moment(policy.life_date, 'YYYY-MM-DD');

                this.refs.form.setFieldsValue(policy);
                editor.txt.html(policy.content);
                this.belongChange(policy.belong); //请求发布机构
            }
        }
    }
    onSubmit = async(values,url) => {
        const {release_date,life_date,editorContent,id,fileList} = this.state;
        values.release_date = release_date;
        values.life_date = life_date;
        values.content = editorContent;
        values.member_id = cookie.load("userId");
        values.username = cookie.load("userName");
        values.upload_file_list = fileList.map((item,idx)=>item.response.data.id);
        if(id){
            values.id = id;
        }
        const data = await request(this.state.id ? '/policy/update' : '/policy/add', 'POST',values);
        if(data.data && data.data.success){
            message.success(data.data.msg);
            setTimeout(()=>{
                this.props.history.push(url ? url+"/"+data.data.data.id : '/policyList');
            },2000);
        }else{
            message.error(data.data.msg);
        }
    }
    onFinish = async (values) => {
        console.log(values,this);
        values.status = 2;
        this.onSubmit(values);

    }
    onSave = async () => {
        let values = this.refs.form.getFieldsValue();
        values.status = 1;
        this.onSubmit(values);

    }
    onView = () =>{
        let values = this.refs.form.getFieldsValue();
        values.status = 1;
        this.onSubmit(values,"/policyPreview");
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
    //发文日期
    onDateChange = (date,dateString) =>{
        this.setState({
            release_date:dateString
        })
    }
    onDateLifeChange = (date,dateString) =>{
        this.setState({
            life_date:dateString
        })
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
    showPolicy = () =>{
        this.setState({
            policyVisible:true
        })
    }
    handleOk = async(e) => {
        const deleteData = await request('/policy/del', 'POST',{id:this.state.id}); //删除数据
        if(deleteData.data && deleteData.data.success){
            message.success(deleteData.data.msg);
            this.setState({
                policyVisible: false,
                id:null
            });
            setTimeout(()=>{
                this.getTableData(this.state.formValues);
            },1000);
        }else{
            message.error(deleteData.data.msg);
        }
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            policyVisible: false,
        });
    };
    switchChange = (checked) =>{
        console.log(`switch to ${checked}`);
    }
    render() {
        const {industryData,belongData,themeData,typeData,productData,id,data,tableData,formValues} = this.state;
        const props = {
            //action: 'http://web.js.policy.com/api/common/upload-file',
            action:uploadUrl,
            onChange: this.handleUploadChange,
            multiple: true,
            data:{
                userId:cookie.load("userId"),
                userName:cookie.load("userName"),
                userType:cookie.load("userType"),
            },
            accept:".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,ppt,.pptx,.xls,.xlsx,.pdf,.zip,.rar"
        };
        const pagination = {
            current:formValues && formValues.page ? formValues.page : 1,
            showSizeChanger: true,
            defaultCurrent: 1,
            defaultPageSize:20,
            total:tableData && tableData.sum || 0,
            // showTotal:(total, range) => `共 ${tableData.page_num} 页 总计 ${tableData.sum} 条政策`,
            pageSizeOptions: ['10', '20', '30', '50', '100', '150'],
            onShowSizeChange: this.onShowSizeChange,
            onChange:this.onPaginChange
        }

        return (
            <div className="addPolicy-template">
                <Top />
                <div className="addPolicy-label-box max-weight-box">
                <Row>
                    <Col span={4}>
                        <PolicyManagementMenu />
                    </Col>
                    <Col span={20}>
                    <Title name={id ? "编辑项目" : "添加项目"} />
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>项目管理</Breadcrumb.Item>
                        <Breadcrumb.Item href="/projectList">项目列表</Breadcrumb.Item>
                        <Breadcrumb.Item>{id ? "编辑项目" : "添加项目"} </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="label-box">
                        <Form.Provider>
                        <Form ref="form" {...layout} name="dynamic_rule" onFinish={this.onFinish} validateMessages={validateMessages}>
                            <Form.Item name="title" label="项目标题" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="belong" label="关联政策" rules={[{required: true}]}>
                                <span></span>
                                <Button onClick={this.showPolicy}>选择政策</Button>
                            </Form.Item>
                            <Form.Item name="belong" label="所属层级" rules={[{required: true}]}>
                                <Select onChange={this.belongChange}>
                                    {belongData ? belongData.map((item, idx) => <Option value={item.id}
                                                                                        key={item.id}>{item.name}</Option>) : ''}
                                </Select>
                            </Form.Item>
                            <Form.Item name="organization_label_list" label="发布机构" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange}
                                >
                                    {productData ? productData.map((item, idx) => <Option value={item.id}
                                                                                          key={item.id}>{item.name}</Option>) : ''}
                                </Select>
                            </Form.Item>
                            <Form.Item name="organization_label_list" label="官文网址" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="release_date" label="申报时间" rules={[{required: true}]}>
                                <DatePicker onChange={this.onDateChange} />
                            </Form.Item>
                            <Form.Item name="use_type_list" label="应用类型" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange}
                                >
                                    {typeData ? typeData.map((item, idx) => <Option value={item.id}
                                                                                    key={item.id}>{item.name}</Option>) : ''}

                                </Select>
                            </Form.Item>
                            <Form.Item name="industry_label_id_list" label="所属行业" rules={[{required: true}]}>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    onChange={this.handleChange}
                                >
                                    {industryData ? industryData.map((item, idx) => <Option value={item.id}
                                                                                            key={item.id}>{item.name}</Option>) : ''}

                                </Select>
                            </Form.Item>
                            <Form.Item name="content" label="扶持方向">
                                <div ref="editorElem">
                                </div>
                            </Form.Item>
                            <Form.Item name="content" label="申报条件">
                                <div ref="editorElem">
                                </div>
                            </Form.Item>
                            <Form.Item name="content" label="扶持内容">
                                <div ref="editorElem">
                                </div>
                            </Form.Item>
                            <Form.Item name="organization_label_list" label="联系方式" rules={[{required: true}]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="content" label="申报材料">
                                <div ref="editorElem">
                                </div>
                            </Form.Item>
                            <Form.Item name="content" label="申报流程">
                                <div ref="editorElem">
                                </div>
                            </Form.Item>
                            <Form.Item name="content" label="评审流程">
                                <div ref="editorElem">
                                </div>
                            </Form.Item>
                            <Form.Item name="username" label="上传附件">
                                <Upload {...props} fileList={this.state.fileList}>
                                    <Button>
                                        <UploadOutlined /> 上传文件
                                    </Button>
                                </Upload>
                                <span>支持扩展名为.doc/.docx/.ppt/.pptx/.xls/.xlsx/.pdf/.zip/.rar，大小不超过100M</span>
                            </Form.Item>
                            <Form.Item name="post_shop_name" label="发文字号" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <p>请选择申报方式（可多选）</p>
                            <div>
                                <Checkbox>网上申报</Checkbox>
                                <Form.Item name="username">
                                    <Input/>
                                </Form.Item>
                            </div>
                            <div>
                                <Checkbox>纸质材料提交至</Checkbox>
                                <Form.Item name="username">
                                    <TextArea rows={4}/>
                                </Form.Item>
                            </div>
                            <div>
                                <span>申报条件标签：</span>
                                <table style={{width:"100%"}}>
                                    <tr>
                                        <th>标签</th>
                                        <th>规则设置</th>
                                        <th>操作</th>
                                    </tr>
                                    <tr>
                                        <td>成立年限</td>
                                        <td>
                                            <Select
                                                style={{ width: '50px' }}
                                            >
                                                <Option value="≥" key="≥">≥</Option>
                                                <Option value="=" key="=">=</Option>
                                                <Option value="≤" key="≤">≤</Option>
                                            </Select>
                                            <Input/>
                                        </td>
                                        <td><Switch defaultChecked onChange={this.switchChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>注册地址</td>
                                        <td>
                                            <Select
                                                style={{ width: '50px' }}
                                            >
                                                <Option value="≥" key="≥">≥</Option>
                                                <Option value="=" key="=">=</Option>
                                                <Option value="≤" key="≤">≤</Option>
                                            </Select>
                                            省
                                            <Select
                                                style={{ width: '50px' }}
                                            >
                                                <Option value="≥" key="≥">≥</Option>
                                                <Option value="=" key="=">=</Option>
                                                <Option value="≤" key="≤">≤</Option>
                                            </Select>
                                            市
                                            <Select
                                                style={{ width: '50px' }}
                                            >
                                                <Option value="≥" key="≥">≥</Option>
                                                <Option value="=" key="=">=</Option>
                                                <Option value="≤" key="≤">≤</Option>
                                            </Select>
                                            区县
                                        </td>
                                        <td><Switch defaultChecked onChange={this.switchChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>知识产权</td>
                                        <td>
                                            <Select
                                                style={{ width: '50px' }}
                                            >
                                                <Option value="≥" key="≥">≥</Option>
                                                <Option value="=" key="=">=</Option>
                                                <Option value="≤" key="≤">≤</Option>
                                            </Select>
                                            <Input/>
                                            个
                                        </td>
                                        <td><Switch defaultChecked onChange={this.switchChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>发明专利</td>
                                        <td>
                                            <Select
                                                style={{ width: '50px' }}
                                            >
                                                <Option value="≥" key="≥">≥</Option>
                                                <Option value="=" key="=">=</Option>
                                                <Option value="≤" key="≤">≤</Option>
                                            </Select>
                                            <Input/>
                                            个
                                        </td>
                                        <td><Switch defaultChecked onChange={this.switchChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>所属行业</td>
                                        <td>
                                            <Input/>
                                        </td>
                                        <td><Switch defaultChecked onChange={this.switchChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>财务数据</td>
                                        <td>
                                            <div>
                                                研发投入
                                                <Select
                                                    style={{ width: '50px' }}
                                                >
                                                    <Option value="≥" key="≥">≥</Option>
                                                    <Option value="=" key="=">=</Option>
                                                    <Option value="≤" key="≤">≤</Option>
                                                </Select>
                                                <Input/>
                                                万元
                                            </div>
                                            <div>
                                                企业报税收入
                                                <Select
                                                    style={{ width: '50px' }}
                                                >
                                                    <Option value="≥" key="≥">≥</Option>
                                                    <Option value="=" key="=">=</Option>
                                                    <Option value="≤" key="≤">≤</Option>
                                                </Select>
                                                <Input/>
                                                万元
                                            </div>
                                            <div>
                                                研发资产总额
                                                <Select
                                                    style={{ width: '50px' }}
                                                >
                                                    <Option value="≥" key="≥">≥</Option>
                                                    <Option value="=" key="=">=</Option>
                                                    <Option value="≤" key="≤">≤</Option>
                                                </Select>
                                                <Input/>
                                                万元
                                            </div>
                                        </td>
                                        <td><Switch defaultChecked onChange={this.switchChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>人员数量</td>
                                        <td>
                                            <div>
                                                最近一年缴纳社保人数
                                                <Select
                                                    style={{ width: '50px' }}
                                                >
                                                    <Option value="≥" key="≥">≥</Option>
                                                    <Option value="=" key="=">=</Option>
                                                    <Option value="≤" key="≤">≤</Option>
                                                </Select>
                                                <Input/>
                                                人
                                            </div>
                                            <div>
                                                研发人员
                                                <Select
                                                    style={{ width: '50px' }}
                                                >
                                                    <Option value="≥" key="≥">≥</Option>
                                                    <Option value="=" key="=">=</Option>
                                                    <Option value="≤" key="≤">≤</Option>
                                                </Select>
                                                <Input/>
                                                人
                                            </div>
                                        </td>
                                        <td><Switch defaultChecked onChange={this.switchChange}/></td>
                                    </tr>
                                </table>
                            </div>
                            <div className="addPolicy-button">
                                <Button type="primary" htmlType="submit" ref="finish">发布</Button>
                                <Button type="primary" className="ml15" ref="save" onClick={()=>this.onSave()}>存为草稿</Button>
                                <Button type="primary" className="ml15" onClick={()=>this.onView()}>预览</Button>
                                <Button className="ml15" onClick={()=>window.history.back()}>返回</Button>
                            </div>
                        </Form>
                        </Form.Provider>
                    </div>
                    </Col>
                </Row>
                </div>
                <Modal
                    title="选择政策"
                    visible={this.state.policyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="800px"
                >
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                        enterButton
                    />
                    <Table columns={this.columns} dataSource={tableData ? tableData.result : []} pagination={false} rowKey="id" />
                </Modal>
            </div>
        );
    };
}

export default AddProject;