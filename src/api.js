const hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroisSchema = require('./db/strategies/mongodb/schemas/herois')
const HeroRoutes = require('./routes/heroRoutes')
const HeroRoute = require('./routes/heroRoutes')

const app = hapi.Server({
    port: 3000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connected()

    const context = new Context(new MongoDb(connection, HeroisSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('Servidor rodando na porta:', app.info.port)

    return app
}

module.exports = main()