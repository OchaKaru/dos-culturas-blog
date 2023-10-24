import * as React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles(({theme, role, }) => ({
    
}));

export default function FilledTextBox({label, tip, role, onTextChange}) {

    const classes = useStyles({})
    return (
        <label htmlFor={label} className={`${classes['arroz-textbox']} ${className?? ""}`}>
            <Label>{label}</Label>
            <input id={label} type="text" name={label} onChange={onTextChange}/>
        </label>
    );
}