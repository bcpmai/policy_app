import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            footerClass:''
        }
    }
    componentDidMount(){
        // this.setState({
        //     top: document.body.clientHeight - 290
        // });
        console.log(document.body.clientHeight,document.getElementById("main").offsetHeight)
        // if(document.body.clientHeight>document.getElementById("main").offsetHeight) {
        //     console.log(111)
        //     this.setState({
        //         footerClass: {top: document.body.clientHeight-70,position: "absolute",left:0,width: "100%"}
        //     });
        // }
    }

    render() {
        const {footerClass,top} = this.state;

        console.log(footerClass,this.props);
        return (
                <div className="footer-component-template">
                    <div className="max-weight-box">
                    Copyright © www.cqxxx.gov.cn All Rights Reserved. 重庆市九龙坡区人民政府版权所有 重庆市九龙坡区人民政府办公室承办<br />
                    ICP备案：渝ICP备xxxxxxxxxx号-x 联系电话：023-xxxxxxxxx 国际联网备案： 渝公网安备 5001xxxxxxxxxx号<br />
                    网站标识码：500xxxxxxx建议使用1920×768分辨率 IE9.0及以上版本浏览<br /><br />
                    重庆市九龙坡区版权所有
                    </div>
                </div>
        );
    };
}

export default Footer;