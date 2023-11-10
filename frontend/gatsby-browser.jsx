import * as React from 'react';
import loadable from '@loadable/component';

import Header from './src/components/header';
// import Footer from './src/components/footer';

import './src/styles/global.scss';

const Root = loadable(() => import('./src/arroz-con-webo').Root);

export const wrapPageElement = ({element, props}) => {
    return (
        <Root {...props}>
            <Header />
            {element}
            {/* <Footer /> */}
        </Root>
    );
}