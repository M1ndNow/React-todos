import React from 'react'

export default class TodoItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            editStyle: {
                display: 'none'
            },
            viewStyle: {
                display: 'flex'
            },
            delBtnStyle: {
                display: 'none'
            }
        }
    }

    // 双击进行编辑
    handleDoubleClick = ()=>{
        let value = this.props.content;
        this.setState({
            value,
            editStyle: {
                display: 'block'
            },
            viewStyle: {
                display: 'none'
            }
        })
        setTimeout(()=>document.getElementById(this.props.id).focus(),0)
    }

    handleValueChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleBlur = () => {
        this.setState({
            editStyle: {
                display: 'none'
            },
            viewStyle: {
                display: 'flex'
            }
        })
        this.props.handleEdit(this.props.id, this.state.value);
    }

    showDelBtn = () => {
        this.setState({
            delBtnStyle:{
                display: 'block'
            }
        })
    }

    hideDelBtn = () => {
        this.setState({
            delBtnStyle:{
                display: 'none'
            }
        })
    }

    render(){
        let {completed, handleCompleteClick, content, id, handleDeleteClick} = this.props;
        let {value, editStyle, viewStyle, delBtnStyle} = this.state;
        
        let labelStyle = {
            textDecoration : !completed ? 'none' : 'line-through',
            display: 'inline-block'
        }
        return (
            <li>
                <div 
                className='todo-item' 
                style={viewStyle}
                onMouseEnter={()=>this.showDelBtn()}
                onMouseLeave={()=>this.hideDelBtn()}>
                    <input 
                    type="checkbox"
                    checked={completed}
                    onChange={()=>{handleCompleteClick(id)}}/>
                    <label 
                    style={labelStyle} 
                    onDoubleClick={this.handleDoubleClick}>{content}</label>
                    <div 
                    id='delete-btn'
                    style={delBtnStyle}
                    onClick={()=>handleDeleteClick(id)}
                    >&#735;</div>
                </div>
                <input 
                id={id}
                style={editStyle} 
                value={value}
                onBlur={this.handleBlur}
                onChange={this.handleValueChange}/>
            </li>
        )
    }
}