import * as React from 'react';
import {createUseStyles} from 'react-jss';
import {Title, FilledButton, FilledTextBox} from '../arroz-con-webo';

const useStyles = createUseStyles(({theme}) => ({
    
}));

export default function NewsLetterSubscribe({}) {
    return (
        <div>
            <Title>Subscribe to our newsletter!</Title>
            <Form>
                <FilledTextBox label="Your email">example@email.com</FilledTextBox>
                <FilledButton>Submit</FilledButton>
            </Form>
        </div>
    );
}