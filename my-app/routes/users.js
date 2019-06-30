var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var ds = require('./config/config');
var tocket = require('../jwt/jwt');


//Punto 1
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/signin', function (req, res) {
  if (req.body.tipo == 'admin' || req.body.tipo == 'user') {

    ds.connection.getConnection(
      function (err, connection) {
        connection.query('Insert into parcial_2.user(nombre,clave,tipo) value (\'' + req.body.nombre + '\',\'' +
          req.body.clave + '\',\'' +
          req.body.tipo + '\')', function (err, rows, fields) {
            try {
              if (err) throw err;
              res.send({ status: 'OK' });
            } catch (e) {
              console.log("Error: " + e)
            }
          });
      });
  } else {
    res.send({ status: 'NOOK', description: 'El usuario tiene que ser de tipo admin o user' });
  }

});

//Punto 2
router.post('/login', function (req, res) {
  var clave = req.body.clave;
  var nombre = req.body.nombre;
  var query = 'select count(*) as result from parcial_2.user where nombre like \'' + nombre + '\' and clave like \'' + clave + '\'';

  ds.connection.getConnection(
    function (err, connection) {
      connection.query(query, function (err, rows, fields) {
        try {
          if (err) throw err;
          if (rows[0].result > 0) {
            var body = { nombre: nombre, clave: clave };
            
            res.send({ status: 'OK', tocket: tocket.createJWT(body) });
          } else {
            res.send({ status: 'NOOK', description: 'Error en el logeo' });
          }

        } catch (e) {
          console.log("Error: " + e)
        }
      });
    });
});

module.exports = router;