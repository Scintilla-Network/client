function isUint8Array(obj) {
    // This checks if it's Uint8Array and not a subclass like Buffer
    return obj instanceof Uint8Array && Object.getPrototypeOf(obj) === Uint8Array.prototype;
}

export default isUint8Array;
