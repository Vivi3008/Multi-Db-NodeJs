const hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroisSchema = require('./db/strategies/mongodb/schemas/herois')

const app = hapi.Server({
    port: 3000
})

const nome = 'Super Man'

async function main() {
    const connection = MongoDb.connected()

    const context = new Context(new MongoDb(connection, HeroisSchema))

    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (request, head) => {
            return context.read()
        }
    }])

    await app.start()
    console.log('Servidor rodando na porta:', app.info.port)
}

main()