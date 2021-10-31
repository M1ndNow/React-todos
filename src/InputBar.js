import React from 'react';
import {v4 as uuid} from 'uuid';

class InputBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({value: e.target.value});
    }

    // 按下回车键添加todo项
    handlePressReturn = (e) => {
        if(e.charCode === 13 && this.state.value !== ''){
            let item = {};
            item.id = uuid();
            item.content = this.state.value;
            item.completed = false;
            this.props.handleAdd(item);
            this.setState({value:''});
        }
    }

    render(){
        return (
            <div>
                <input
                    type="checkbox" 
                    onChange={this.props.handleSelectAll}
                    checked={this.props.isAllCompleted}/>
                <input 
                onChange={this.handleInputChange} 
                value={this.state.value} 
                placeholder="what needs to be done?"
                onKeyPress={this.handlePressReturn}/>
            </div>
        )
    }
}

export default InputBar;