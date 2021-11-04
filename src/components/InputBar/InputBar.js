import React from 'react';
import { useState } from 'react/cjs/react.development';
import { v4 as uuid } from 'uuid';
import './InputBar.scss';

const InputBar = (props) => {
	const [ value, setValue ] = useState('');
	const { handleSelectAll, isAllCompleted, handleAdd } = props;

	// 按下回车键添加todo项
	const handlePressReturn = (e) => {
		if (e.charCode === 13 && value !== '') {
			handleAdd({
				id: uuid(),
				content: value,
				completed: false
			});
			setValue('');
		}
	};

	return (
		<div className='input-bar'>
			<input type='checkbox' onChange={handleSelectAll} checked={isAllCompleted} />
			<input
				onChange={(e) => setValue(e.target.value)}
				value={value}
				placeholder='What needs to be done?'
				onKeyPress={handlePressReturn}
			/>
		</div>
	);
};

export default InputBar;
