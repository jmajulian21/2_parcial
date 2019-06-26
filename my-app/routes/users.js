var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'parcial_2',
  password: 'GB48fxvcrcOqcGiC'
});


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Obtener secuencia de usuarios
var id_user = function() {
  var res = 0;
  db.query('select count(*) as seq from user', function(err, rows, fields) {
  });
  return res;
}


router.post('/signin', function (req, res) {
  if(req.body.tipo == 'admin' || req.body.tipo == 'user'){

    connection.connect();
    
    connection.query('Insert into parcial_2.user(nombre,clave,tipo) value (\''+req.body.nombre+'\',\''+
                                                                     req.body.clave+'\',\''+
                                                                     req.body.tipo+'\')', function (err, rows, fields) {
      try {
        if(err) throw err;
      }catch(e){
        console.log("Error: "+e)
      }
    });
  
    connection.end();
    res.send({status:'OK'});
  }else{
    res.send({status:'NOOK',description:'El usuario tiene que ser de tipo admin o user'});
  }

});


module.exports = router;
