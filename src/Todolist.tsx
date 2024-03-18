import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (taskId: string, NewTitle: string) => void
}



export const TodoList = (props: PropsType) => {

    const onAllClickHandler = () => { props.changeFilter('all', props.id) }

    const onActiveClickHandler = () => { props.changeFilter('active', props.id) }

    const onCompletedClickHandler = () => { props.changeFilter('completed', props.id) }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {

        props.addTask(title, props.id)
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} lable={'New task'} />
            <div>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                        }

                        const changeTaskTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        }

                        return (
                            <div className={t.isDone ? "is-done" : ""} key={t.id}>
                                <Checkbox
                                    {...label}
                                    checked={t.isDone}
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan title={t.title} onChange={changeTaskTitleHandler} />
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                        )
                    })
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
};








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