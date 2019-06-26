var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'parcial_2',
  password: 'GB48fxvcrcOqcGiC'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST : Crear elemento
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var id = 0;

router.post('/signin', function (req, res) {
  id = id +1;
  var user = req.body;

  connection.connect();
 
  connection.query('Insert into user(id_user) value (+'+id+')', function (err, rows, fields) {
    try {
      if(err) throw err;
      //var id = rows[0].seq + 1;
      //json.res(id);
    }catch(e){
      console.log("Error: "+e)
    }
  });

  connection.end();
  console.log(id);
});


module.exports = router;
