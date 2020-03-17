import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="footer-component-template">
                重庆市九龙坡区版权所有
            </div>
        );
    };
}

export default Footer;