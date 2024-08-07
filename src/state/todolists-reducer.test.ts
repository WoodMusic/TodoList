import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolist-reducer';
import nextId from "react-id-generator";
import { TodolistType, FilterValuesType } from '../AppWithRedux';


test('correct todolist should be removed', () => {
    let todolistId1 = nextId();
    let todolistId2 = nextId();

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = nextId();
    let todolistId2 = nextId();

    let newTodolistTitle = 'NewTodolist';

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});


test('correct todolist should change its name', () => {
    let todolistId1 = nextId();
    let todolistId2 = nextId();

    let newTodolistTitle = 'NewTodolist';

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = nextId();
    let todolistId2 = nextId();

    let newFilter: FilterValuesType = 'completed';

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' }
    ]

    const action = changeTodolistFilterAC(newFilter, todolistId2)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});


