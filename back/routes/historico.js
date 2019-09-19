var express = require('express')
var router = express.Router()
var mongo = require('./mongo')

router.get('/', function (req, res) {
  mongo.obtenerHistorico(res)
})

router.delete('/', function (req, res) {
  mongo.eliminarHistorico(res)
})

router.get('/url', function (req, res) {
  const url = req.body.url
  mongo.buscarUrl(url, res)
})

router.post('/url', function (req, res) {
  const url = req.body
  mongo.agregarUrl(url, res)
})

module.exports = router
