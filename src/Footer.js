import React from 'react'

export default function Footer(props){
    let {activeTodos, completedTodos} = props.todos;
    let {handleUndo, handleRedo, cache} = props;
    return (
        <div>
            <span>{activeTodos.length} {activeTodos.length>1?'items':'item'} left</span>
            <button onClick={()=>props.handleModeChange('All')}>All</button>
            <button onClick={()=>props.handleModeChange('Active')}>Active</button>
            <button onClick={()=>props.handleModeChange('Completed')}>Completed</button>
            {
                // 有已经完成的todo
                completedTodos.length > 0 ? 
                <a href="#" onClick={props.handleClearClick}>Clear completed</a> : ''
            }
            <br></br>
            <button 
            disabled={props.mode !== 'Active' && activeTodos.length>0}
            onClick={handleUndo}>Undo</button>
            <button
            disabled={cache.length === 0} 
            onClick={handleRedo}>Redo</button>
        </div>
    )
}