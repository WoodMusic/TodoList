import { TextField } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('SPAN is called');
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };

    const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }, []);

    return editMode
        ? <TextField
            variant="standard"
            value={title}
            onChange={onChangeTitleHandler}
            onBlur={activateViewMode}
            autoFocus
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
});



