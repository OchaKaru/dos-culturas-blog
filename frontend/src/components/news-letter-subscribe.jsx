import * as React from 'react';
import {FilledCard, Title, Subheading, Form, FilledTextBox, FilledButton} from '../arroz-con-webo';

export default function NewsLetterSubscribe({}) {
    const handleSubmit = event => {

    };

    return (
        <FilledCard className="news-letter-subscribe">
            <Title>Subscribe to our newsletter!</Title>
            <Subheading>Get culture to your inbox daily!</Subheading>
            <Form className="subscribe-form" onSubmit={handleSubmit}>
                <FilledTextBox className="subscribe-textbox" label="Your email">example@email.com</FilledTextBox>
                <FilledButton pill type="submit">Submit</FilledButton>
            </Form>
        </FilledCard>
    );
}