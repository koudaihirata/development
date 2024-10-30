import React, { useState } from 'react';
import Task from '../../components/Task';
import { TaskHooks } from '../../hooks/TaskHooks';


export default function List() {
    const {
        inputValue,
        tasks,
        handleInputChange,
        handleAddTask,
        handleKeyDown,
        handleRemoveTask
    } = TaskHooks();
    
    return (
        <section style={{ padding: '24px' }}>
            <h2>リスト</h2>
            <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}  />
            <button onClick={handleAddTask}>追加</button>

            {tasks.map((task, index) => (
                <Task key={index} task={task} onRemove={() => handleRemoveTask(index)} />
            ))}
        </section>
    );
}


