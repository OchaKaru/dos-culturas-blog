import * as React from 'react';
import {Title, FilledButton, Form, FilledTextBox, FilledCard} from '../arroz-con-webo';

import '../styles/home/news-letter-subscribe.scss';

export default function NewsLetterSubscribe({}) {
    const handleSubmit = event => {

    };

    return (
        <FilledCard className="news-letter-subscribe">
            <Title>Subscribe to our newsletter!</Title>
            <Form onSubmit={handleSubmit}>
                <FilledTextBox label="Your email">example@email.com</FilledTextBox>
                <FilledButton pill type="submit">Submit</FilledButton>
            </Form>
        </FilledCard>
    );
}