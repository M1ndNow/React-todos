import React from 'react'
import TodoItem from './TodoItem'

export default function Board(props){
    let showList;
    switch(props.mode){
      case 'All':
          showList = props.todoList.map((item)=>(
              <TodoItem key={item.id} {...item} handleCompleteClick={props.handleCompleteClick}></TodoItem>
          ));
          break;
      case 'Active':
          showList = props.todoList.filter(item=>!item.completed).map((item)=>(
            <TodoItem key={item.id} {...item} handleCompleteClick={props.handleCompleteClick}></TodoItem>
          ))
          break;
      case 'Completed':
          showList = props.todoList.filter(item=>item.completed).map((item)=>(
            <TodoItem key={item.id} {...item} handleCompleteClick={props.handleCompleteClick}></TodoItem>
          ))
          break;
      default:
          showList = props.todoList;
    }
    return (
        <ul>
            { showList }
        </ul>
    )
}