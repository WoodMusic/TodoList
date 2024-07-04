import React, { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { TaskType } from "./Todolist";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


type TaskPropsType = {
    changeTodolistTitle: (taskId: string, NewTitle: string) => void
    task: TaskType
    todolistId: string
}


export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch();

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const onRemoveHandler = useCallback(() => {
        const action = removeTaskAC(props.task.id, props.todolistId);
        dispatch(action);
    }, []);

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const action = changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId);
        dispatch(action);
    }

    const changeTaskTitleHandler = (newValue: string) => {
        const action = changeTaskTitleAC(props.task.id, newValue, props.todolistId);
        dispatch(action);
    }

    return (
        <div className={props.task.isDone ? "is-done" : ""} key={props.task.id}>
            <Checkbox
                {...label}
                checked={props.task.isDone}
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan title={props.task.title} onChange={changeTaskTitleHandler} />
            <IconButton onClick={onRemoveHandler}>
                <Delete />
            </IconButton>
        </div>
    )
});
