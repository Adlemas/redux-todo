import { createSlice } from "@reduxjs/toolkit";

function array_move(arr: any[], old_index: number, new_index: number) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

export type ITask = {
    label: string;
    id: string;
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: Array<ITask>(),
        value: ""
    },
    reducers: {
        addTask(state, action) {
            // Append task at the begin.
            state.tasks = [action.payload, ...state.tasks]
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        moveTask(state, action) {
            const { id, to } = action.payload;
            let from: number = -1
            state.tasks.forEach((task, index) => {
                if(task.id === id) from = index
            })
            let toIndex: number = -1
            state.tasks.forEach((task, index) => {
                if(task.id === to) toIndex = index
            })
            if(state.tasks.length <= from || !state.tasks[from]) return;
            state.tasks = array_move(state.tasks, from, toIndex)
        }
    }
})

export const { addTask, moveTask, removeTask } = taskSlice.actions

export default taskSlice.reducer;