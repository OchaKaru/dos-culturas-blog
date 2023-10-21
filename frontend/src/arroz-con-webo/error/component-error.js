export class InvalidContainerError extends Error {
    constructor(cause = {"code": "Invalid props.containerType."}) {
        super("Invalid container type provided to component.", {"cause": cause})
    }
}

export class InvalidModeError extends Error {
    constructor(cause = {"code": "Invalid props.mode."}) {
        super("Invalid mode provided to component.", {"cause": cause})
    }
}

export class InvalidRoleError extends Error {
    constructor(cause = {"code": "Invalid props.role."}) {
        super("Invalid role provided to component.", {"cause": cause})
    }
}

export class LanguageNotSupportedError extends Error {
    constructor(cause = {"code": "Invalid props.language."}) {
        super("Invalid language extension provided to component.", {"cause": cause})
    }
}

export class NoContextError extends Error {
    constructor(cause = {"code": "Undefined props.context."}) {
        super("No context provided to the component.", {"cause": cause})
    }
}

export class NoNameError extends Error {
    constructor(cause = {"code": "Undefined props.name."}) {
        super("No name provided to the component.", {"cause": cause})
    }
}

export class NoSourceProvidedError extends Error {
    constructor(cause = {"code": "Undefined props.source."}) {
        super("No image source file provided to the component.", {"cause": cause})
    }
}

export class NoStyleSheetExistsError extends Error {
    constructor(cause = undefined) {
        super("No style sheet of the provided name exists.", {"cause": cause})
    }
}

export class StyleSheetExistsError extends Error {
    constructor(cause = undefined) {
        super("A style sheet of the provided name already exists", {"cause": cause})
    }
}