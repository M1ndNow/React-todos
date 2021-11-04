import React from 'react';
import { ACTIVE, ALL, COMPLETED } from '../../modeTypes';
import './Footer.scss';

export default function Footer(props) {
	const {
		activeNum,
		completedNum,
		handleUndo,
		handleRedo,
		isUndoListEmpty,
		mode,
		handleModeChange,
		handleClearClick
	} = props;
	return (
		<div className='footer'>
			<p>
				{activeNum} {activeNum > 1 ? 'items' : 'item'} left
			</p>
			<div className='mode-btns'>
				<button className={mode === ALL ? 'active' : ''} onClick={() => handleModeChange(ALL)}>
					All
				</button>
				<button className={mode === ACTIVE ? 'active' : ''} onClick={() => handleModeChange(ACTIVE)}>
					Active
				</button>
				<button className={mode === COMPLETED ? 'active' : ''} onClick={() => handleModeChange(COMPLETED)}>
					Completed
				</button>
				<button
					id='undo-btn'
					className={mode !== ACTIVE || activeNum === 0 ? 'disabled' : ''}
					disabled={mode !== ACTIVE || activeNum === 0}
					onClick={handleUndo}
				>
					Undo
				</button>
				<button
					id='redo-btn'
					className={isUndoListEmpty ? 'disabled' : ''}
					disabled={isUndoListEmpty}
					onClick={handleRedo}
				>
					Redo
				</button>
			</div>
			{// 有已经完成的todo
			completedNum > 0 ? (
				<p onClick={handleClearClick} id='clear'>
					Clear completed
				</p>
			) : (
				''
			)}
		</div>
	);
}
