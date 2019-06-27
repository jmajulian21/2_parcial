var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var tocket = require('../jwt/jwt');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'parcial_2',
    password: 'GB48fxvcrcOqcGiC'
});

//Punto 3
router.post('/producto', function (req, res) {
    var id = 1;

    connection.connect();
    connection.query('insert into parcial_2.producto(id_producto,nombre,marca,precioVenta,precioCosto,stock) values ('+id+',\''+
                                                                                                                       req.body.nombre+'\',\''+
                                                                                                                       req.body.marca+'\','+
                                                                                                                       req.body.precioVenta+','+
                                                                                                                       req.body.precioCosto+','+
                                                                                                                       req.body.stock+')', function (err, rows, fields) {
        try {
            if (err) throw err;
        } catch (e) {
            console.log("Error: " + e)
        }
    });
    connection.end();

    res.send({status:'OK'});
});

//Punto 4
router.get('/producto', function (req, res) {
    
    connection.connect();
    connection.query('select * from parcial_2.producto', function (err, rows, fields) {
        try {
            if (err) throw err;
            res.json(rows);
        } catch (e) {
            console.log("Error: " + e)
        }
    });
    connection.end();
});

//Punto 5
router.get('/producto/:marca', function (req, res) {
    connection.connect();
    connection.query('select * from parcial_2.producto where marca like \''+req.params.marca +'\'', function (err, rows, fields) {
        try {
            if (err) throw err;
            res.json(rows);
        } catch (e) {
            console.log("Error: " + e)
        }
    });
    connection.end();
});

//Punto 6
router.delete('/producto/:id', function (req, res) {
    var decodeUser = tocket.decodeJWT(req.headers.tocket); //undefined
    
    connection.connect();
    connection.query('delete from parcial_2.producto where id_producto = ' + req.params.id , function (err, rows, fields) {
        try {
            if (err) throw err;
        } catch (e) {
            console.log("Error: " + e)
        }
    });
    connection.end();
    res.json({status: 'OK'});
});


module.exports = router;