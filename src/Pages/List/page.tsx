import Task from '../../components/Task';
import { TaskHooks } from '../../hooks/TaskHooks';


export default function List() {
    const {
        inputValue,
        tasks,
        bagItems,
        handleInputChange,
        handleAddTask,
        handleKeyDown,
        handleRemoveTask,
        handleAddBag
    } = TaskHooks();
    
    return (
        <section style={{padding: '24px'}}>
            <h2>リスト</h2>
            <div style={{display:'flex',gap:'24px'}}>
                <div style={{border:'1px solid #000',padding: '12px'}}>
                    <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}  />
                    <button onClick={handleAddTask}>追加</button>

                    {tasks.map((task, index) => (
                        <Task key={index} task={task} onRemove={() => handleRemoveTask(index)} onAdd={() => handleAddBag(index)} />
                    ))}
                </div>
                <div style={{width:'300px',height:'150px',border:'1px solid #000'}}>
                    <h4>カバンの中</h4>
                    <ul>
                        {bagItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}


