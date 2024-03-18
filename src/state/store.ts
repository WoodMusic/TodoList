import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolist-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

// type AppRootState = {
//     todolists: Array<TodolistType>
//     tasks: TaskStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;