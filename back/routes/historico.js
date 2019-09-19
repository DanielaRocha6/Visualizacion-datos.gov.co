var express = require('express');
var router = express.Router();
var mongo = require('./mongo');

router.get('/', function(req, res) {
  mongo.obtenerHistorico(res);
});

router.get("/url", function (req, res) {
  const url = req.body.url;
  mongo.buscarUrl(url, res);
  res.send('index', { title: 'Express' });
});

router.post("/url", function (req, res) {
  const url = req.body;
  console.log("asi llega", req.body);
  
    mongo.agregarUrl(url, res);
});



module.exports = router;
