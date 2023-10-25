import * as React from 'react';
import {createUseStyles} from 'react-jss';
import {Title, FilledButton, Form, FilledTextBox} from '../arroz-con-webo';

const useStyles = createUseStyles(({theme}) => ({
    
}));

export default function NewsLetterSubscribe({}) {
    const handleSubmit = event => {

    };

    return (
        <div>
            <Title>Subscribe to our newsletter!</Title>
            <Form onSubmit={handleSubmit}>
                <FilledTextBox label="Your email">example@email.com</FilledTextBox>
                <FilledButton pill type="submit">Submit</FilledButton>
            </Form>
        </div>
    );
}