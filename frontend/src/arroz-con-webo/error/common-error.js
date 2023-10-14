export class InvalidFormatError extends Error {
    constructor(cause = undefined) {
        super("Invalid formatting of provided property or argument.", {"cause": cause})
    }
}

export class InvalidKeyError extends Error {
    constructor(cause = undefined) {
        super("Invalid key used for a dictionary, map, or object.", {"cause": cause})
    }
}

export class NoMatchError extends Error {
    constructor(cause = undefined) {
        super("No matching value for provided property or argument.", {"cause": cause})
    }
}

export class NotAnIntegerError extends Error {
    constructor(cause = undefined) {
        super("Provided value is not an integer.", {"cause": cause})
    }
}

export class NotEnoughArgumentsError extends Error {
    constructor(cause = undefined) {
        super("Insufficient arguments or parameters provided.", {"cause": cause})
    }
}