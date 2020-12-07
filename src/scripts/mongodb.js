//databases
show dbs

//mudando o contexto para uma database
use herois

//mostrar tables(coleções)
show collections


//inserindo 10000 dados
for (let i = 0; i <= 10000; i++) {
    db.herois.insert({
        nome: `CloneFlash-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

//retorna quantos registros
db.herois.count()

//retorna o primeiro dado
db.herois.findOne()

db.herois.find().limit(1000).sort({ nome: -1 })

db.herois.find({}, { poder: 1, _id: 0 })

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update, altera e exclui o restante dos campos
db.herois.update({ _id: ObjectId("5fc7895fe81e70336e93a552") }, { nome: "Mulher Maravilha" })

//update, altera somente o campo setado
db.herois.update({ _id: ObjectId("5fc7895fe81e70336e93a559") }, { $set: { nome: "Lanterna Verde" } })

db.herois.update({ poder: "Velocidade" }, { $set: { poder: "Super Força" } })

//delete
//deleta toda a base
db.herois.remove({})

//deleta um dado específico
db.herois.remove({ nome: "Lanterna Verde" })