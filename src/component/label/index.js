import React, {Component} from 'react';
import {render} from 'react-dom';
import { Row, Col, Button} from 'antd';
import './index.css';

class Label extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        console.log(this.props);
    }

    render() {
        const {title,item,className,span} = this.props;
        return (
            <div className="Label-component-template">
                <Row>
                    <Col span={2}>{title}：</Col>
                    <Col span={span || 22} className={`label-item-${className}`}>
                        {item.map((titem,tidx)=>
                            <Button shape="round" size="small" key={titem.id}>{titem.name}</Button>
                        )}

                    </Col>
                </Row>
            </div>
        );
    };
}

export default Label;