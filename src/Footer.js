import React from 'react'

export default function Footer(props){
    
    return (
        <div>
            <span>{props.activeNum} item left</span>
            <button onClick={(e)=>props.handleModeChange('All')}>All</button>
            <button onClick={(e)=>props.handleModeChange('Active')}>Active</button>
            <button onClick={(e)=>props.handleModeChange('Completed')}>Completed</button>
            {
                // 有已经完成的todo
                props.todoList.length > props.activeNum ? 
                <a href="#" onClick={props.handleClearClick}>Clear completed</a> : ''
            }
        </div>
    )
}