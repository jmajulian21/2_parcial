var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var tocket = require('../jwt/jwt');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'parcial_2',
  password: 'GB48fxvcrcOqcGiC'
});


//Punto 1
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/signin', function (req, res) {
  if (req.body.tipo == 'admin' || req.body.tipo == 'user') {

    connection.connect();

    connection.query('Insert into parcial_2.user(nombre,clave,tipo) value (\'' + req.body.nombre + '\',\'' +
      req.body.clave + '\',\'' +
      req.body.tipo + '\')', function (err, rows, fields) {
        try {
          if (err) throw err;
        } catch (e) {
          console.log("Error: " + e)
        }
      });

    connection.end();

    res.send({ status: 'OK' });
  } else {
    res.send({ status: 'NOOK', description: 'El usuario tiene que ser de tipo admin o user' });
  }

});

//Punto 2
router.post('/login', function (req, res) {
  var clave = req.body.clave;
  var nombre = req.body.nombre;
  var query = 'select count(*) as result from parcial_2.user where nombre like \''+nombre+'\' and clave like \''+clave+'\'';

  connection.connect();
  connection.query(query, function (err, rows, fields) {
      try {
          if (err) throw err;
          if(rows[0].result > 0){
            var body = {nombre: nombre, clave:clave};

            res.send({status:'OK',tocket: tocket.createJWT(body)});
          }else{
            res.send({status:'NOOK', description:'Error en el logeo'});
          }
          
      } catch (e) {
          console.log("Error: " + e)
      }
  });
  connection.end();
});

module.exports = router;