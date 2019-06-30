var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'parcial_2',
    password: 'GB48fxvcrcOqcGiC'
});

module.exports={connection}