// src/App.tsx
import React, { useState } from 'react';
import Task from '../../components/Task';


export default function List() {
    const [inputValue, setInputValue] = useState<string>('');
    const [tasks, setTasks] = useState<string[]>([]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    
    const handleAddTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            handleAddTask();
        }
    };

    const handleRemoveTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };
    
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


