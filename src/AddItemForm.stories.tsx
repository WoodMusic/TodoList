import React from "react";
import { action } from '@storybook/addon-actions';
import { AddItemForm } from "./AddItemForm";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callback = action('Button "add" was pressed inside the form');

export const AddItemFormBaseExample = (props: any) => {
    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return <AddItemForm addItem={callback} label={props.label} />
}

