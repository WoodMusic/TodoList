import { TaskStateType, TodolistType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolist-reducer";


test('ids should be equals', () => {
    const startTaskState: TaskStateType = {};
    const startTodolistState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTaskState = tasksReducer(startTaskState, action);
    const endTodolistState = todolistsReducer(startTodolistState, action);

    const keys = Object.keys(endTaskState);
    const idFromTask = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromTask).toBe(action.todolistId);
    expect(idFromTodolist).toBe(action.todolistId)
});