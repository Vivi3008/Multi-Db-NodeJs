const ICrud = require('./interfaces/interfaceCrud')

class MongoDb extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em MongoDb')
    }
}

module.exports = MongoDb