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
        let {handleSelectAll, isAllCompleted} = this.props;
        let {value} = this.state;
        return (
            <div className='input-bar'>
                <input
                    type='checkbox'
                    onChange={handleSelectAll}
                    checked={isAllCompleted}/>
                <input 
                onChange={this.handleInputChange} 
                value={value} 
                placeholder='What needs to be done?'
                onKeyPress={this.handlePressReturn}/>
            </div>
        )
    }
}

export default InputBar;