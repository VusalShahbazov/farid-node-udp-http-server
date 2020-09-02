var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Baku2019!',
    database : 'node_udp'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;