import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ITask, removeTask } from "../../redux/tasks";
import './Task.css'

type TaskProps = ITask & {
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
};

const Task: React.FC<TaskProps> = ({ id, label, onDragStart }) => {
    const dispatch = useDispatch()

    const [drag, setDrag] = useState(false)

    const ref = useRef<HTMLDivElement>(null);

    const handleRemoveTask = () => {
        dispatch(removeTask(id))
    }

    const handleBlur = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setDrag(false)
    };

    const handleFocus = () => setDrag(true);

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDrag(false)
    }
    
    return (
        <div
            data-id={id}
            className={`task${drag ? ' focus' : ''}`}
            draggable
            onDragEnd={handleDragEnd}
            onDragStart={onDragStart}
            onMouseDown={handleFocus}
            onMouseUp={handleBlur}
            onMouseOut={handleBlur}
            ref={ref}
        >
            <input type="checkbox" onChange={e => {
                if(e.target.checked === true) {
                    handleRemoveTask()
                }
            }} />

            <label>{label}</label>

            <span className="btn btn-error" onClick={handleRemoveTask}>
                <i className="fa-solid fa-trash"></i>
            </span>
        </div>
    )
}

export default Task
