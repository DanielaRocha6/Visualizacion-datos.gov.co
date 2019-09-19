require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const url = `mongodb://${process.env.USUARIO1}:${process.env.PASS}@ds051575.mlab.com:51575/daniela`

const obtenerHistorico = function (res) {
  const client = new MongoClient(url)
  client.connect((err) => {
    if (err) throw err
    const db = client.db('daniela')
    const col = db.collection('datos-gov')
    col.find({}).toArray((err, result) => {
      if (err) throw err
      res.send(result)
      client.close()
    })
  })
}

const eliminarHistorico = function (res) {
  const client = new MongoClient(url)
  client.connect((err) => {
    if (err) throw err
    const db = client.db('daniela')
    const col = db.collection('datos-gov')
    col.deleteMany({})
  })
}

const buscarUrl = function (value, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  const client = new MongoClient(url)
  client.connect((err) => {
    if (err) throw err
    const db = client.db('daniela')
    const col = db.collection('datos-gov')
    col.find({ url: value }).toArray((err, result) => {
      if (err) throw err
      res.send(result)
      client.close()
    })
  })
}

const agregarUrl = function (body, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  const client = new MongoClient(url)
  client.connect((err) => {
    if (err) throw err
    const db = client.db('daniela')
    const col = db.collection('datos-gov')

    col.insertOne(body)
    res.send(body)
  })
}

module.exports = {
  agregarUrl: agregarUrl,
  buscarUrl: buscarUrl,
  obtenerHistorico: obtenerHistorico,
  eliminarHistorico: eliminarHistorico
}
