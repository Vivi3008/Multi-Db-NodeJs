const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')


const context = new Context(new MongoDb())

describe('MongoDb Testes', function() {
    this.beforeAll(async function() {
        await context.connected()
    })

    it('Verificar conexão', async() => {
        const result = await context.isConnected()
        const expected = 'Connected'

        assert.deepStrictEqual(result, expected)
    })
})