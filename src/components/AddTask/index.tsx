import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { addTask } from "../../redux/tasks";

const AddTask: React.FC = () => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')

    const handleAddTask = () => {
        if (!value || !value.length) return;

        dispatch(addTask({
            label: value,
            id: String(Date.now() + '-' + Math.floor(Math.random() * 9999))
        }))

        setValue('')
    }

    return (
        <form className='beautiful-input center' onSubmit={(e) => {
            e.preventDefault()
            handleAddTask();
            (e.target as HTMLElement).querySelector('input')?.focus()
        }}>
            <i className="fa-solid fa-list-check"></i>
            <input value={value} onChange={e => setValue(e.target.value)} placeholder={'Enter task name...'} />
            <button className="btn btn-primary" type='submit'>ADD</button>
        </form>
    )
}

export default AddTask