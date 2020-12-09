const ICrud = require('./interfaces/interfaceCrud')
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
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    async isConnected() {

        const state = STATUS[this._driver.readyState]

        if (state === 'Connected') return state

        if (state !== 'Connecting') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]

    }

    connected() {
        Mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
            if (!error) return
            console.log("Falha na conexão! ", error)
        })
        const connection = Mongoose.connection

        connection.once('open', () => console.log('Database rodando!'))

        this._driver = connection
        this.defineModel()
    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true,
            },
            poder: {
                type: String,
                required: true,
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })

        this._herois = Mongoose.model('herois', heroiSchema)
    }

    create(item) {
        return this._herois.create(item)
    }

    async read(item, skip = 0, limit = 10) {
        return await this._herois.find({ nome: item }).skip(skip).limit(limit)
    }
}

module.exports = MongoDb