import React from 'react'
import TodoItem from './TodoItem'

export default function Board(props){
    let showList;
    let {allTodos, activeTodos, completedTodos} = props.todos;
    switch(props.mode){
      case 'All':
          showList = allTodos;
          break;
      case 'Active':
          showList = activeTodos;
          break;
      case 'Completed':
          showList = completedTodos;
          break;
      default:
          showList = allTodos;
    }
    return (
        <ul>
            { 
            showList.map((item)=>(
                <TodoItem 
                key={item.id} 
                {...item}
                handleEdit={props.handleEdit} 
                handleCompleteClick={props.handleCompleteClick}></TodoItem>
            )) 
          }
        </ul>
    )
}