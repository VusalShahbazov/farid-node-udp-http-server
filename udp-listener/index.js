const dgram = require("dgram");


const server = dgram.createSocket("udp4");


server.on("error", function (err) {
    console.log(err)
    server.close();
});


server.on("listening", function () {
    const address = server.address();
    console.log("server listening "  +
        address.address + ":" + address.port , "For Ilker abi");
});


server.bind()