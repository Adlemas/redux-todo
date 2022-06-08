import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Task from './components/Task';
import { IRootState } from './redux/configureStore';
import { addTask, moveTask } from './redux/tasks';

function App() {
  const { tasks } = useSelector((state: IRootState) => state.tasks)
  const dispatch = useDispatch()

  const [value, setValue] = useState('')

  const [dragEl, setDragEl] = useState<HTMLDivElement | null>(null)

  const handleAddTask = () => {
    if (!value || !value.length) return;

    dispatch(addTask({
      label: value,
      id: String(Date.now() + '-' + Math.floor(Math.random() * 9999))
    }))

    setValue('')
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    
    if(!dragEl) return;
    
    const target = e.target as HTMLElement;
    if (target && target !== dragEl && target.dataset.id && target.className.includes('task')) {
      dispatch(moveTask({
        id: dragEl.dataset.id, to: target.dataset.id
      }))
    }
  }

  return (
    <div className='App'>
      <div className="container">
        <h1 className='center'>Todo Redux</h1>

        <form className='beautiful-input center' onSubmit={(e) => {
          e.preventDefault()
          handleAddTask();
          (e.target as HTMLElement).querySelector('input')?.focus()
        }}>
          <i className="fa-solid fa-list-check"></i>
          <input value={value} onChange={e => setValue(e.target.value)} placeholder={'Enter task name...'} />
          <button className="btn btn-primary" type='submit'>ADD</button>
        </form>

        <div
        className="task-list center"
        onDragOver={handleDragOver}>
          {tasks.length ?
            tasks.map(task => {
              return (
                <Task
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                    setDragEl(e.target as HTMLDivElement)
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', (e.target as HTMLDivElement).innerText);
                  }}
                  key={task.id}
                  {...task} />
              )
            })
            :
            <span className='no-tasks'>
              No tasks yet...
            </span>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
