import React from 'react'

export default function TodoItem(props){
    let style = {};
    style['textDecoration'] = !props.completed ? 'none' : 'line-through';
    return (
        <p>
            <input 
            type="checkbox" 
            id={props.id} 
            checked={props.completed}
            onChange={(e)=>{props.handleCompleteClick(props.id)}}/>
            <label htmlFor={props.id} style={style} >{props.content}</label>
        </p>
    )
}