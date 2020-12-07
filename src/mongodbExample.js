const Mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

Mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(error) {
        if (!error) return
        console.log("Falha na conexão! ", error)
    })
    //testando conexão
const connection = Mongoose.connection

connection.once('open', () => console.log('Database rodando!'))

//criando model
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

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log(resultCadastrar)

    const listItems = await model.find()
    console.log('Itens: ', listItems)
}
main()