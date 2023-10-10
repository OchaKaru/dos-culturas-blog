export class NoContextError extends Error {
    constructor(cause = {"code": "Undefined props.context."}) {
        super("No context provided to the component.", {"cause": cause})
    }
}

export class InvalidRoleError extends Error {
    constructor(cause = {"code": "Invalid props.role."}) {
        super("Invalid role provided to component.", {"cause": cause})
    }
}