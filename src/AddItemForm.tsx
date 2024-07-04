import React, { KeyboardEvent, ChangeEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

type AddItemPropsType = {
    addItem: (title: string) => void
    label: string
}

export const AddItemForm = React.memo((props: AddItemPropsType) => {
    console.log('AddItemForm is called');

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            if (title.trim() !== '') {
                addTask();
                setTitle('');
            } else {
                setError('Title is required!')
            }
        }
    }

    const addTask = () => {

        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required!')
        }
    }

    const onChangeErrorStatus = () => {
        setError(null);
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={props.label}
                value={title}
                type="text"
                onChange={onNewTitleChangeHandler}
                onBlur={onChangeErrorStatus}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={addTask}
                color={'primary'}>
                <ControlPoint />
            </IconButton>
        </div>
    )
})