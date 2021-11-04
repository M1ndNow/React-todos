import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import InputBar from '../InputBar/InputBar';
import { ACTIVE, ALL, COMPLETED } from '../../modeTypes';
import { getItemFromLocalStorage, updateLocalStorage } from '../../localStorageOperation';
import './App.scss';

const isAllTodosCompleted = (todos) => todos.length > 0 && todos.every((item) => item.completed);

export default function App() {
	const [ todos, setTodos ] = useState(getItemFromLocalStorage('todos'));
	const [ mode, setMode ] = useState(ALL);
	const [ undoList, setUndoList ] = useState(getItemFromLocalStorage('undoList'));
	let activeTodos, completedTodos, showList;

	useEffect(
		() => {
			updateLocalStorage('todos', todos);
		},
		[ todos ]
	);

	useEffect(
		() => {
			updateLocalStorage('undoList', undoList);
		},
		[ undoList ]
	);

	// 添加todo项目
	const handleAdd = (item) => {
		setTodos([ item, ...todos ]);
	};

	// 点击todo项，修改completed状态
	const handleCompleteClick = (targetId) => {
		setTodos(
			todos.map((item) => {
				if (item.id === targetId) {
					item.completed = !item.completed;
				}
				return item;
			})
		);
	};

	// 清空已完成todo
	const handleClearClick = () => {
		setTodos(todos.filter((item) => !item.completed));
	};

	// 切换筛选模式
	const handleModeChange = (newMode) => {
		setMode(newMode);
	};

	// 全选/取消全选
	const handleSelectAll = () => {
		const allCompleted = isAllTodosCompleted(todos);
		setTodos(
			todos.map((item) => {
				item.completed = allCompleted ? false : true;
				return item;
			})
		);
	};

	// 单行编辑
	const handleEdit = (id, content) => {
		setTodos(
			todos.map((item) => {
				if (item.id === id) {
					item.content = content;
				}
				return item;
			})
		);
	};

	// Undo操作
	const handleUndo = () => {
		const undoItem = todos.find((item) => !item.completed);

		setUndoList([ undoItem, ...undoList ]);
		setTodos(todos.filter((item) => item.id !== undoItem.id));
	};

	// Redo操作
	const handleRedo = () => {
		const redoItem = undoList.shift();
		setTodos([ redoItem, ...todos ]);
		setUndoList(undoList.filter((item) => item.id !== redoItem.id));
	};

	// 点击删除
	const handleDeleteClick = (id) => {
		setTodos(todos.filter((item) => item.id !== id));
	};

	activeTodos = todos.filter((item) => !item.completed);
	completedTodos = todos.filter((item) => item.completed);

	switch (mode) {
		case ALL:
			showList = todos;
			break;
		case ACTIVE:
			showList = activeTodos;
			break;
		case COMPLETED:
			showList = completedTodos;
			break;
		default:
			showList = todos;
	}

	return (
		<div className='container'>
			<h1>todos</h1>
			<InputBar
				handleAdd={handleAdd}
				isAllCompleted={isAllTodosCompleted(todos)}
				handleSelectAll={handleSelectAll}
			/>
			<Board
				showList={showList}
				handleEdit={handleEdit}
				handleDeleteClick={handleDeleteClick}
				handleCompleteClick={handleCompleteClick}
			/>
			<Footer
				todos={todos}
				activeNum={activeTodos.length}
				completedNum={completedTodos.length}
				mode={mode}
				isUndoListEmpty={undoList.length === 0}
				handleUndo={handleUndo}
				handleRedo={handleRedo}
				handleClearClick={handleClearClick}
				handleModeChange={handleModeChange}
			/>
		</div>
	);
}
