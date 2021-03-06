const udp = require('dgram')
var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('/VIK5<1>V1.02VEMM\r\n' +
    ' 0.0.0(03464431)\r\n' +
    '0.8.0(15*min)\r\n' +
    '0.9.1(12:45:30)\r\n' +
    '0.9.2(20-04-22)\r\n' +
    '0.9.5(3)\r\n' +
    '1.6.0(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*1(000.122*kW)(20-03-13,22:30)\r\n' +
    '1.6.0*2(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*3(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*4(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*5(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*6(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*7(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*8(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*9(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*10(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*11(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.6.0*12(000.000*kW)(00-00-00,00:00)\r\n' +
    '1.8.0(00000.419*kWh)\r\n' +
    '1.8.1(00000.195*kWh)\r\n' +
    '1.8.1*1(00000.195*kWh)\r\n' +
    '1.8.1*2(00000.000*kWh)\r\n' +
    '1.8.1*3(00000.000*kWh)\r\n' +
    '1.8.1*4(00000.000*kWh)\r\n' +
    '1.8.1*5(00000.000*kWh)\r\n' +
    '1.8.1*6(00000.000*kWh)\r\n' +
    '1.8.1*7(00000.000*kWh)\r\n' +
    '1.8.1*8(00000.000*kWh)\r\n' +
    '1.8.1*9(00000.000*kWh)\r\n' +
    '1.8.1*10(00000.000*kWh)\r\n' +
    '1.8.1*11(00000.000*kWh)\r\n' +
    '1.8.1*12(00000.000*kWh)\r\n' +
    '1.8.2(00000.088*kWh)\r\n' +
    '1.8.2*1(00000.088*kWh)\r\n' +
    '1.8.2*2(00000.000*kWh)\r\n' +
    '1.8.2*3(00000.000*kWh)\r\n' +
    '1.8.2*4(00000.000*kWh)\r\n' +
    '1.8.2*5(00000.000*kWh)\r\n' +
    '1.8.2*6(00000.000*kWh)\r\n' +
    '1.8.2*7(00000.000*kWh)\r\n' +
    '1.8.2*8(00000.000*kWh)\r\n' +
    '1.8.2*9(00000.000*kWh)\r\n' +
    '1.8.2*10(00000.000*kWh)\r\n' +
    '1.8.2*11(00000.000*kWh)\r\n' +
    '1.8.2*12(00000.000*kWh)\r\n' +
    '1.8.3(00000.136*kWh)\r\n' +
    '1.8.3*1(00000.136*kWh)\r\n' +
    '1.8.3*2(00000.000*kWh)\r\n' +
    '1.8.3*3(00000.000*kWh)\r\n' +
    '1.8.3*4(00000.000*kWh)\r\n' +
    '1.8.3*5(00000.000*kWh)\r\n' +
    '1.8.3*6(00000.000*kWh)\r\n' +
    '1.8.3*7(00000.000*kWh)\r\n' +
    '1.8.3*8(00000.000*kWh)\r\n' +
    '1.8.3*9(00000.000*kWh)\r\n' +
    '1.8.3*10(00000.000*kWh)\r\n' +
    '1.8.3*11(00000.000*kWh)\r\n' +
    '1.8.3*12(00000.000*kWh)\r\n' +
    '1.8.4(00000.000*kWh)\r\n' +
    '1.8.4*1(00000.000*kWh)\r\n' +
    '1.8.4*2(00000.000*kWh)\r\n' +
    '1.8.4*3(00000.000*kWh)\r\n' +
    '1.8.4*4(00000.000*kWh)\r\n' +
    '1.8.4*5(00000.000*kWh)\r\n' +
    '1.8.4*6(00000.000*kWh)\r\n' +
    '1.8.4*7(00000.000*kWh)\r\n' +
    '1.8.4*8(00000.000*kWh)\r\n' +
    '1.8.4*9(00000.000*kWh)\r\n' +
    '1.8.4*10(00000.000*kWh)\r\n' +
    '1.8.4*11(00000.000*kWh)\r\n' +
    '1.8.4*12(00000.000*kWh)\r\n' +
    '96.1.3(17-03-08)\r\n' +
    '96.2.2(17-03-08,16:54)\r\n' +
    '96.2.5(17-03-08)\r\n' +
    '96.50(06001700220099999999999999999999)\r\n' +
    '96.51(06001700220099999999999999999999)\r\n' +
    '96.52(06001700220099999999999999999999)\r\n' +
    '96.6.1(1)\r\n' +
    '96.60(12399999)\r\n' +
    '96.61(12399999)\r\n' +
    '96.62(12399999)\r\n' +
    '96.70(00-00-00,00:00)\r\n' +
    '96.71(00-00-00,00:00)(00)\r\n' +
    '96.71*1(00-00-00,00:00)(00)\r\n' +
    '96.71*2(00-00-00,00:00)(00)\r\n' +
    '96.71*3(00-00-00,00:00)(00)\r\n' +
    '96.71*4(00-00-00,00:00)(00)\r\n' +
    '96.71*5(00-00-00,00:00)(00)\r\n' +
    '96.71*6(00-00-00,00:00)(00)\r\n' +
    '96.71*7(00-00-00,00:00)(00)\r\n' +
    '96.71*8(00-00-00,00:00)(00)\r\n' +
    '96.71*9(00-00-00,00:00)(00)\r\n' +
    '96.71*10(00-00-00,00:00)(00)\r\n' +
    '96.71*11(00-00-00,00:00)(00)\r\n' +
    '96.71*12(00-00-00,00:00)(00)\r\n' +
    '96.97(01*hour)\r\n' +
    '96.98(0)\r\n' +
    '32.7.0(00235.845*V)\r\n' +
    '31.7.0(00000.000*A)\r\n' +
    '21.7.0(00000.000*kW)\r\n' +
    '33.7.0(00000.101)\r\n' +
    '14.7.0(00050.077*Hz)\r\n' +
    '!\r\n' +
    '  ');

client.on('message',function(msg,info){
    console.log('Data received from server : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\r\n',msg.length, info.address, info.port);
});

//sending msg
client.send(data,8085,'sayqac.vac.az:8080/',function(error){
    if(error){
        client.close();
        console.log(error)
    }else{
        console.log('Data sent !!!');
    }
});