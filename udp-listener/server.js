// require dependencies
const dgram = require("dgram");
const redis = require("redis");
const fs = require('fs');

// configure env variables
require('dotenv').config();
const REDIS_PORT = process.env.REDIS_PORT ? process.env.REDIS_PORT : 6379;
const REDIS_HOST = process.env.REDIS_HOST ? process.env.REDIS_HOST : 'localhost';
const NODE_UDP_SERVER_PORT = process.env.NODE_UDP_SERVER_PORT ? process.env.NODE_UDP_SERVER_PORT : 8085;

// redis connection
let publisher = redis.createClient(REDIS_PORT, REDIS_HOST);

// create udp server
const server = dgram.createSocket("udp4");


//error event
server.on("error", function (err) {
    server.close();
});



let chank = "";
server.on("message", function (msg, remoteInfo) {
    chank += msg.toString();
    if (chank.includes("!")){
        console.log(chank)
        let arr = chank.split("\r\n");
        let data = {
            energy : "" ,
            seria : "73046911",
            volt: "",
            amper:"",
            is_open : false,
            time:"",
            date:"",
        };
        arr.forEach(el =>{
            if (el.includes("1.8.0("))
                data.energy = el;
            // if (el.includes("32.7.0("))
            //     data.volt = el;
            // if (el.includes("14.7.0("))
            //     data.frekans = el;
            // if (el.includes("31.7.0("))
            //     data.amper = el;
            if (el.includes("0.9.1("))
                data.time = el;

            if (el.includes("0.9.2("))
                data.date = el;
        });
        console.log(data);
        publisher.publish("rData" , JSON.stringify(data));
        chank = "";
    }
});

server.on("listening", function () {
    var address = server.address();
    console.log("server listening "  +
        address.address + ":" + address.port);
});

server.bind(NODE_UDP_SERVER_PORT);

