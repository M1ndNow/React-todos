import React from 'react';
import { useState } from 'react/cjs/react.development';
import './TodoItem.scss';

export default function TodoItem({ completed, handleCompleteClick, content, id, handleDeleteClick, handleEdit }) {
	const [ value, setValue ] = useState('');
	const [ viewStyle, setViewStyle ] = useState('');
	const [ delBtnStyle, setDelBtnStyle ] = useState('destroyed');
	const [ editorStyle, setEditorStyle ] = useState('destroyed');

	// 双击进行编辑
	const handleDoubleClick = () => {
		setEditorStyle('');
		setViewStyle('destroyed');
		setValue(content);
		setTimeout(() => document.getElementById(id).focus(), 0);
	};

	// 编辑框失去焦点
	const handleBlur = () => {
		setEditorStyle('destroyed');
		setViewStyle('');
		handleEdit(id, value);
	};

	return (
		<li>
			<div
				className={`todo-item ${viewStyle}`}
				onMouseEnter={() => setDelBtnStyle('')}
				onMouseLeave={() => setDelBtnStyle('destroyed')}
			>
				<input type='checkbox' checked={completed} onChange={() => handleCompleteClick(id)} />
				<label className={`${completed ? 'todo-completed' : 'todo-active'}`} onDoubleClick={handleDoubleClick}>
					{content}
				</label>
				<div id='delete-btn' className={`${delBtnStyle}`} onClick={() => handleDeleteClick(id)}>
					&#735;
				</div>
			</div>
			<input
				id={id}
				className={editorStyle}
				value={value}
				onBlur={handleBlur}
				onChange={(e) => setValue(e.target.value)}
			/>
		</li>
	);
}
