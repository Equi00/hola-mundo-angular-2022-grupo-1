class RestrictedTripException extends Error {
    constructor(msg?: string){
        super(msg)
        Object.setPrototypeOf(this, ElementNotFoundException.prototype)
    }
}
