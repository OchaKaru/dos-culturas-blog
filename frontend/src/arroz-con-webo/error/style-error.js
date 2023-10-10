export class InvalidHexcodeError extends Error {
    constructor(cause = undefined) {
        super("Invalid hexcode type or format provided.", {"cause": cause})
    }
}

export class AlreadyInitializedError extends Error {
    constructor(cause = undefined) {
        super("The themer has already been initialized.", {"cause": cause})
    }
}

export class NotInitializedError extends Error {
    constructor(cause = undefined) {
        super("The themer is not initialized.", {"cause": cause})
    }
}

export class NoPaletteFoundError extends Error {
    constructor(cause = undefined) {
        super("No palette found by that name.", {"cause": cause})
    }
}