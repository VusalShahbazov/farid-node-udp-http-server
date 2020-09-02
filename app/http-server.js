const redis = require('redis');
const express = require('express');


var sql = require('./db/db.js');

const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
let subscriber = redis.createClient();



require('dotenv').config();
const NODE_TCP_SERVER_PORT = process.env.NODE_TCP_SERVER_PORT ? process.env.NODE_TCP_SERVER_PORT : 8080;

let clients = [];

app.use('/assets' , express.static(__dirname +'/assets'));

app.get("/" , (req , res) => {
    res.set({
        'Content-Type':'text/html'
    });
    res.sendFile(path.join(__dirname, 'templates' , 'index.html'));
});


app.get("/api/log" , (req , res) => {
    //CONVERT(volt,UNSIGNED INTEGER) as 
    sql.query(`Select DISTINCT  volt  , amper , energy , created_at from logs where created_at >= '${req.query.from}' and created_at <= '${req.query.to}'  order by created_at desc`, function (err, data) {
        if(err) {
            console.log("error: ", err);
        }
        else{
            res.json(data)
        }
    });
});

server.listen(NODE_TCP_SERVER_PORT , function () {
    console.log(`Listening on  ${NODE_TCP_SERVER_PORT}`)
});

io.on('connection', (socket) => {
    clients.push(socket)

    sql.query("Select * from logs order by id desc limit 1 ", function (err, data) {
        if(err) {
            console.log("error: ", err);
        }
        else{
             socket.emit("data" , (data[0]))
        }
    });
});

io.on('disconnect', (socket) => {
    const index = clients.indexOf(socket);
    if (index !== -1) clients.splice(index, 1);
});

subscriber.on('message' , function (ch , msg) {
    console.log(msg)
    clients.forEach(client => {
        let d = JSON.parse(msg)
        let data  = {
            energy : d.energy.substring(d.energy.indexOf("(")+1 ,d.energy.indexOf("*")) ,
            seria : d.seria,
            volt: "--",
            amper: "--",
            is_open : false,
            frekans : "--",
            time: d.time.substring(d.time.indexOf("(")+1 ,d.time.indexOf(")")),
            date: "2020-08-18",
        };


        sql.query("INSERT INTO logs set ?", data, function (err, res) {

            if(err) {
                console.log("error: ", err);
            }
        });

        client.emit('data', data )
    });
});


subscriber.subscribe('rData');
