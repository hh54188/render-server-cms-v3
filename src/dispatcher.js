class Dispatcher {
    constructor() {
        this._callbackQueue = [];
    }
    register(callback) {
        this._callbackQueue.push(callback);
    }
    dispatch(payload) {
        this._callbackQueue.forEach((callback) => {
            callback(payload);
        });
    }
}

export default new Dispatcher();