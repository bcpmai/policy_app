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
        console.log(document.body.clientHeight,document.getElementById("main").offsetHeight)
        if(document.body.clientHeight>document.getElementById("main").offsetHeight) {
            console.log(111)
            this.setState({
                footerClass: {top: document.body.clientHeight-70,position: "absolute",left:0,width: "100%"}
            });
        }
    }

    render() {
        const {footerClass} = this.state;

        console.log(footerClass,this.props);
        return (
                <div className="footer-component-template">
                 {/*<div className="footer-component-template" style={this.props.footerClass ? {...this.props.footerClass}: {...footerClass}}>*/}
                重庆市九龙坡区版权所有
                </div>
        );
    };
}

export default Footer;