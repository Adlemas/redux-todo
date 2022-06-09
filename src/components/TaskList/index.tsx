import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { moveTask } from "../../redux/tasks";
import Task from "../Task";

const TaskList: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()
  
  const [dragEl, setDragEl] = useState<HTMLDivElement | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    if (!dragEl) return;

    const target = e.target as HTMLElement;
    if (target && target !== dragEl && target.dataset.id && target.className.includes('task')) {
      dispatch(moveTask({
        id: dragEl.dataset.id, to: target.dataset.id
      }))
    }
  }

  return (
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
    )
}

export default TaskList