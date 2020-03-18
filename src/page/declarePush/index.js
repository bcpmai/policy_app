/**
 * 申报推送
 * */
import React, {Component} from 'react';
import {render} from 'react-dom';
import { Table, Tag } from 'antd';
import axios from 'axios';
import Top from './../../component/top';
// import Footer from "../../component/footer";
import './index.css';

class DeclarePush extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.columns = [
            {
                title: '项目标题',
                dataIndex: 'title',
                key: 'title',
                render: text => <a>{text}</a>,
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
                title: '申报日期',
                key: 'time',
                dataIndex: 'time'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (<span><a>立即申报</a></span>),
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
    render() {
        return (
            <div className="declarePush-template">
                <Top />
                <div className="declarePush-form-box max-weight-box">
                    <div className="declarePush-title">申报推送</div>
                    <div className="declarePush-title-h1">根据您所填信息，您可申报以下项目</div>
                    <Table columns={this.columns} dataSource={this.data} pagination={this.pagination} />
                </div>
                {/*<Footer/>*/}
            </div>
        );
    };
}

export default DeclarePush;