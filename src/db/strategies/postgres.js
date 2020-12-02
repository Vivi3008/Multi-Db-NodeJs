const ICrud = require('./interfaces/interfaceCrud')
const { Sequelize } = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        this.connected()
    }


    async isConnected() {
        try {
            await this._driver.authenticate()
            return true

        } catch (error) {
            console.log("Fail!", error)
            return false
        }
    }


    async connected() {
        this._driver = new Sequelize(
            'heroes',
            'viviramos',
            'minhasenhasecreta', {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
            }
        )
        await this.defineModel()
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
                id: {
                    type: Sequelize.INTEGER,
                    required: true,
                    primaryKey: true,
                    autoIncrement: true,
                },

                nome: {
                    type: Sequelize.STRING,
                    required: true,
                },

                poder: {
                    type: Sequelize.STRING,
                    required: true,
                }
            }, {
                tableName: 'TB_HEROIS',
                freezeTableName: false,
                timestamps: false
            })
            //sincronizando com o bd
        await this._herois.sync()
    }

    async read(item = {}) {
        return await this._herois.findAll({ where: item, raw: true })
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._herois.destroy({ where: query })
    }

    async update(id, item) {
        return this._herois.update(item, { where: { id: id }, returning: true, raw: true })
    }
}

module.exports = Postgres