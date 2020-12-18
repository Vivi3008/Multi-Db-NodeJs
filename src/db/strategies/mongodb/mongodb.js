const ICrud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const STATUS = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
}


class MongoDb extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }

    async isConnected() {

        const state = STATUS[this._connection.readyState]

        if (state === 'Connected') return state

        if (state !== 'Connecting') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }

    static connected() {
        Mongoose.connect('mongodb://admin:senhaadmin@localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
            if (!error) return
            console.log("Falha na conexão! ", error)
        })
        const connection = Mongoose.connection

        connection.once('open', () => console.log('Database rodando!'))

        return connection

    }

    create(item) {
        return this._schema.create(item)
    }

    async read(item, skip = 0, limit = 10) {
        if (!item) {
            return await this._schema.find()
        } else {
            return await this._schema.find({ nome: item }).skip(skip).limit(limit)
        }
    }

    update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item })
    }

    delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDb