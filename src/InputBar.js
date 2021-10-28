import React from 'react';
import {v4 as uuid} from 'uuid';

class InputBox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            input: ''
        }
    }

    handleInput = (e) => {
        let val = e.target.value;
        this.setState({input: val});
    }

    // 按下回车键添加todo项
    handlePressReturn = (e) => {
        if(e.charCode === 13 && this.state.input !== ''){
            let item = {};
            item.id = uuid();
            item.content = this.state.input;
            item.completed = false;
            this.props.handleAdd(item);
            this.setState({input:''});
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
                onChange={this.handleInput} 
                value={this.state.input} 
                placeholder="what needs to be done?"
                onKeyPress={this.handlePressReturn}></input>
            </div>
        )
    }
}

export default InputBox;