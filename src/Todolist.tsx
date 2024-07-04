import React, { useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useDispatch, useSelector } from "react-redux";
import { addTaskAC } from "./state/tasks-reducer";
import { AppRootState } from "./state/store";
import { Task } from "./Task";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (taskId: string, NewTitle: string) => void
}



export const TodoList = React.memo((props: PropsType) => {
    console.log('TODOLIST is called');

    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    //*********** */

    //***** */

    const onAllClickHandler = useCallback(() => { props.changeFilter('all', props.id) }, [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => { props.changeFilter('active', props.id) }, [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => { props.changeFilter('completed', props.id) }, [props.changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }, [props.changeTodolistTitle, props.id])


    let tasksForTodoList = tasks;
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    }

    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const addTask = useCallback((title: string) => {
        const action = addTaskAC(title, props.id);
        dispatch(action);
    }, [props.id])

    const labelContent = 'New Task'

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} label={labelContent} />
            <div>
                {
                    tasksForTodoList.map(t => <Task
                        task={t}
                        changeTodolistTitle={changeTodolistTitle}
                        todolistId={props.id}
                        key={props.id}
                    />)

                }
            </div>

            <div>
                <Button
                    sx={{ m: 2 }}
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )
});













// import * as React from 'react';
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// export default function IconCheckboxes() {
//   return (
//     <div>
//       <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
//       <Checkbox
//         {...label}
//         icon={<BookmarkBorderIcon />}
//         checkedIcon={<BookmarkIcon />}
//       />
//     </div>
//   );
// }