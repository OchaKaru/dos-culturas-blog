/**
 * This function validates that the role inputted to the container is usable.
 * @param {*} role 
 */
export function valid_container_role(role) {
    const ACCEPTED_ROLES = [
        'primary', 'secondary', 'tertiary', 
        'surface', 'surface-lowest', 'surface-lower',
        'surface-higher', 'surface-highest'
    ];
    return ACCEPTED_ROLES.includes(role)? true : false;
}

export function valid_role(role) {
    const ACCEPTED_ROLES = [
        'primary', 'secondary', 'tertiary', 'surface'
    ];
    return ACCEPTED_ROLES.includes(role)? true : false;
}

export function surface_role(role) {
    const SURFACE_ROLES = [
        'surface', 'surface-lowest', 'surface-lower',
        'surface-higher', 'surface-highest'
    ]
    return SURFACE_ROLES.includes(role)? true : false;
}

export default {
    valid_container_role, valid_role, surface_role,
}