import * as React from 'react';
import loadable from '@loadable/component';

const Label = loadable(() => import('../arroz-con-webo').Label);

export default function TagList({tags}) {
    return (
        tags?.map(tag => {
            return (
              <Label role="secondary" pill>{tag.name + ': ' + tag.desc}</Label>
            );
        })
    );
}