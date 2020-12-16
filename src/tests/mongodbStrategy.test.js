const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')
const HeroisSchema = require('./../db/strategies/mongodb/schemas/herois')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Super Man',
    poder: 'Força'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Patolino',
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = null

let context = {}

describe('MongoDb Testes', function() {
    this.beforeAll(async function() {
        const connection = MongoDb.connected()
        context = new Context(new MongoDb(connection, HeroisSchema))
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
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
        const [{ nome, poder }] = await context.read(MOCK_HEROI_CADASTRAR.nome)
        const result = {
            nome,
            poder
        }

        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar', async() => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga',
            poder: 'Correr'
        })

        assert.deepStrictEqual(result.nModified, 1)
    })

    it('Deletar', async() => {
        const result = await context.delete(MOCK_HEROI_ID)

        assert.deepStrictEqual(result.n, 1)
    })
})