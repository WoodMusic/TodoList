import React from "react";
import { action } from '@storybook/addon-actions';
import { Task } from "./Task";
import { Provider } from "react-redux";
import { store } from "./state/store";




export default {
    title: 'Task Component',
    component: Task
}

const changeTodolistTitleCallback = action('Title changed');

export const TaskBaseExample = () => {

    return <>
        <Provider store={store}>
            <Task
                task={{ id: '1', isDone: true, title: 'CSS' }}
                changeTodolistTitle={changeTodolistTitleCallback}
                todolistId={'todolistId1'}
            />
        </Provider>
        <Provider store={store}>
            <Task
                task={{ id: '2', isDone: false, title: 'JS' }}
                changeTodolistTitle={changeTodolistTitleCallback}
                todolistId={'todolistId2'}
            />
        </Provider>
    </>


}

