import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './Board.scss';

export default function Board(props) {
	const { showList, handleCompleteClick, handleDeleteClick, handleEdit } = props;

	return (
		<ul className='board'>
			{showList.map((item) => (
				<TodoItem
					key={item.id}
					{...item}
					handleEdit={handleEdit}
					handleDeleteClick={handleDeleteClick}
					handleCompleteClick={handleCompleteClick}
				/>
			))}
		</ul>
	);
}
