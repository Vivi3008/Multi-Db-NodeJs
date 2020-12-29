const assert = require('assert')
const api = require('../api')

let app = {}

describe.only('Suite de testes Api Herois', function() {
    this.beforeAll(async() => {
        app = await api
    })

    it('Listar /herois', async() => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar /herois - deve retornar somente 10', async() => {
        const tamanho = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${tamanho}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(dados.length === tamanho)

    })
})