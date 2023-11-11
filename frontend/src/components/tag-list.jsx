import * as React from 'react';
import {Label} from '../arroz-con-webo';

export default function TagList({tags}) {
    return (
        <div className="tag-list">
            {tags?.map(tag => {
                return (
                    <Label role="secondary" pill>{tag.name}</Label>
                );
            })}
        </div>
    );
}