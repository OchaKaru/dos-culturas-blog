import * as React from 'react';

/**
 * 
 */
export const ContainerContext = React.createContext({"role": "neutral", "container_type": "container"});

/**
 * 
 * @param {*} role
 * @param {*} container_type
 * @returns 
 */
export function valid_container(role, container_type) {
    const CONTAINER_ROLES = [
        'container_lowest', 'container_lower',
        'container',
        'container_higher', 'container_highest'
    ]
    if(role !== "neutral" && container_type !== "container")
        return false;
    return CONTAINER_ROLES.includes(container_type)? true : false;
}
/**
 * This function validates that the role inputted to the container is usable.
 * @param {*} role 
 * @returns
 */
export function valid_role(role) {
    const ACCEPTED_ROLES = [
        'primary', 'secondary', 'tertiary', 'error', 'neutral'
    ];
    return ACCEPTED_ROLES.includes(role)? true : false;
}