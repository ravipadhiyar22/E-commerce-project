class apierror extends Error {
    constructor(statuscode, massage, errors = [], errorstack) {
        super(message);
        this.statuscode = statuscode;
        this.message = message;
        this.errors = errors;
    }
}