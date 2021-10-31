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
                display: 'block'
            }
        }
    }

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
                display: 'block'
            }
        })
        this.props.handleEdit(this.props.id, this.state.value);
    }

    render(){
        let {completed, handleCompleteClick, content, id} = this.props;
        let {value, editStyle, viewStyle} = this.state;
        
        let labelStyle = {
            textDecoration : !completed ? 'none' : 'line-through',
            display: 'inline-block'
        }
        return (
            <li>
                <div style={viewStyle}>
                    <input 
                    type="checkbox"
                    checked={completed}
                    onChange={()=>{handleCompleteClick(id)}}/>
                    <label 
                    style={labelStyle} 
                    onDoubleClick={this.handleDoubleClick}>{content}</label>
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