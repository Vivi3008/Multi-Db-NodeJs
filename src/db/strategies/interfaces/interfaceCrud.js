class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query, skip, limit) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }

    connected() {
        throw new NotImplementedException()
    }
}

module.exports = ICrud