const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')


const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'Lanterna Verde',
    poder: 'Anel'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Super Man',
    poder: 'Aracnídeo'
}

describe('Postgres Strategy', function() {
    this.timeout(Infinity)

    this.beforeAll(async function() {
            await context.connected()
            await context.delete()
            await context.create(MOCK_HEROI_ATUALIZAR)

        })
        //teste de conexão com o bd
    it('Postgres Sql Connection', async function() {
        const result = await context.isConnected()
        assert.strictEqual(result, true)
    })

    /* it('Cadastrar', async function() {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
    }) */

    it('Listar', async function() {
        const [result] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        delete result.id
        console.log(result)
        assert.deepStrictEqual(result, MOCK_HEROI_ATUALIZAR)
    })

    it('Atualizar', async function() {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })

        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            poder: 'Força'
        }

        const [qtd, [result]] = await context.update(itemAtualizar.id, novoItem)

        assert.deepStrictEqual(result.nome, MOCK_HEROI_ATUALIZAR.nome)
    })

    it('Remover por id', async function() {
        const [item] = await context.read({})
        const result = await context.delete(item.id)

        assert.deepStrictEqual(result, 1)
    })
})