var express = require('express');
var router = express.Router();
var ds = require('./config/config');
var tocket = require('../jwt/jwt');

//Punto 3
router.post('/producto', function (req, res) {
    ds.connection.getConnection(
        function (err, connection) {
            connection.query('insert into parcial_2.producto(id_producto,nombre,marca,precioVenta,precioCosto,stock) values (' + id + ',\'' +
                req.body.nombre + '\',\'' +
                req.body.marca + '\',' +
                req.body.precioVenta + ',' +
                req.body.precioCosto + ',' +
                req.body.stock + ')', function (err, rows, fields) {
                    try {
                        if (err) throw err;
                    } catch (e) {
                        console.log("Error: " + e)
                    }
                });
            res.send({ status: 'OK' });
        });
});

//Punto 4
router.get('/producto', function (req, res) {
    ds.connection.getConnection(
        function (err, connection) {
            connection.query('select * from parcial_2.producto', function (err, rows, fields) {
                try {
                    if (err) throw err;
                    connection.release();
                    res.json(rows);
                } catch (e) {
                    console.log("Error: " + e)
                }
            });
        });
});

//Punto 5
router.get('/producto/:marca', function (req, res) {
    ds.connection.getConnection(
        function (err, connection) {
            connection.query('select * from parcial_2.producto where marca like \'' + req.params.marca + '\'', function (err, rows, fields) {
                try {
                    if (err) throw err;
                    connection.release();
                    res.json(rows);
                } catch (e) {
                    console.log("Error: " + e)
                }
            });
        });
});

//Punto 6
router.delete('/producto/:id', function (req, res) {
    var decodeUser = tocket.decodeJWT(req.headers.tocket); //undefined

    ds.connection.getConnection(
        function (err, connection) {
            connection.query('delete from parcial_2.producto where id_producto = ' + req.params.id, function (err, rows, fields) {
                try {
                    if (err) throw err;
                    connection.release();
                    res.json({ status: 'OK' });
                } catch (e) {
                    console.log("Error: " + e)
                }
            });
        });
});


module.exports = router;