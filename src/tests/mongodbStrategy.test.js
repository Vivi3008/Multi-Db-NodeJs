const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDb())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Super Man',
    poder: 'Força'
}

describe('MongoDb Testes', function() {
    this.beforeAll(async function() {
        await context.connected()
    })

    it('Verificar conexão', async() => {
        const result = await context.isConnected()
        const expected = 'Connected'

        assert.deepStrictEqual(result, expected)
    })

    /*  it('Cadastrar', async() => {
         const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)

         console.log('Cadastrado!', 'Nome:', nome, 'Poder:', poder)

         assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
     }) */

    it('Listar', async() => {
        const [result] = await context.read(MOCK_HEROI_CADASTRAR.nome)
        const { nome, poder } = result
        assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })
})