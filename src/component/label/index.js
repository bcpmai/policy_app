import React, {Component} from 'react';
import {render} from 'react-dom';
import { Row, Col, Button, Tag} from 'antd';

import './index.css';

const { CheckableTag } = Tag;
class Label extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
        console.log(this.props);
    }

    handleChange = (checked) => {
        console.log(checked);
        this.setState({ checked });
    };

    onSelect = (selectId) =>{
        this.setState({
            selectId
        })
    }

    render() {
        const {title,item,className,span} = this.props;
        const {selectId} = this.state;
        return (
            <div className="Label-component-template">
                <Row>
                    <Col span={span ? span.title : 2}>{title}</Col>
                    <Col span={span ? span.label : 22} className={`label-item-${className}`}>
                        {item.map((titem,tidx)=>
                            <Button shape="round" size="small" key={titem.id} onClick={()=>this.onSelect(titem.id)} className={selectId==titem.id ? "select-button":""}>{titem.name}</Button>
                            //<CheckableTag checked={this.state.checked} onChange={this.handleChange} key={titem.id}>{titem.name}</CheckableTag>
                        )}

                    </Col>
                </Row>
            </div>
        );
    };
}

export default Label;