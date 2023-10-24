import * as React from 'react';
import {Label} from '../arroz-con-webo';

export default function TagList({tags}) {
    return (
        tags?.map(tag => {
            return (
              <Label role="secondary" pill>{tag.name + ': ' + tag.desc}</Label>
            );
        })
    );
}