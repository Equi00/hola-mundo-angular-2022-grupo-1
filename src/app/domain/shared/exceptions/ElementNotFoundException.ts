class ElementNotFoundException extends Error {
    constructor(notFoundItem: string){
        super(notFoundItem + ' not found.')
        Object.setPrototypeOf(this, ElementNotFoundException.prototype)
    }
}
