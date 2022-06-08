import { configureStore, combineReducers } from "@reduxjs/toolkit";

import tasksReducer from './tasks'

const rootReducer = combineReducers({tasks: tasksReducer})

export type IRootState = ReturnType<typeof rootReducer>;

export default configureStore({
    reducer: {
        tasks: tasksReducer
    }
})