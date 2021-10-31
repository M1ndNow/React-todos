import React from 'react'

export default function Footer(props){
    let {activeTodos, completedTodos} = props.todos;
    let {handleUndo, handleRedo, cache, mode} = props;
    return (
        <div className='footer' >
            <p>{activeTodos.length} {activeTodos.length>1?'items':'item'} left</p>
            <div className='mode-btns'>
                <button className={mode === 'All' ? 'active' : ''} onClick={()=>props.handleModeChange('All')}>All</button>
                <button className={mode === 'Active' ? 'active' : ''} onClick={()=>props.handleModeChange('Active')}>Active</button>
                <button className={mode === 'Completed' ? 'active' : ''} onClick={()=>props.handleModeChange('Completed')}>Completed</button>
                <button
                id='undo-btn'
                className={mode !== 'Active' || activeTodos.length===0?'disabled':''} 
                disabled={mode !== 'Active' || activeTodos.length===0}
                onClick={handleUndo}>Undo</button>
                <button
                id='redo-btn'
                className={cache.length === 0 ? 'disabled' : ''}
                disabled={cache.length === 0} 
                onClick={handleRedo}>Redo</button>
            </div>
            {
                // 有已经完成的todo
                completedTodos.length > 0 ? 
                <p onClick={props.handleClearClick} id='clear'>Clear completed</p> : ''
            }
            {/* <div className='extra-btns'>
                <button 
                disabled={props.mode !== 'Active' && activeTodos.length>0}
                onClick={handleUndo}>Undo</button>
                <button
                disabled={cache.length === 0} 
                onClick={handleRedo}>Redo</button>
            </div> */}
        </div>
    )
}