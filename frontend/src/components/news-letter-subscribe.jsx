import * as React from 'react';
import loadable from '@loadable/component';

import '../styles/home/news-letter-subscribe.scss';

const FilledCard = loadable(() => import('../arroz-con-webo').FilledCard);
const Title = loadable(() => import('../arroz-con-webo').Title);
const Subheading = loadable(() => import('../arroz-con-webo').Subheading);
const Form = loadable(() => import('../arroz-con-webo').Form);
const FilledTextBox = loadable(() => import('../arroz-con-webo').FilledButton);
const FilledButton = loadable(() => import('../arroz-con-webo').FilledButton);

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