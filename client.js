const express = require('express');
const soap = require('soap');
const url = "http://localhost:3030/bmicalculator?wsdl";
var args = {
    precio: 80,
    cant: 180
};

soap.createClient(url, function(err, client) {

    if (err)
        console.error(err);
    else {
        client.calculateBMI(args, function(err, response) {
            if (err)
                console.error(err);
            else {
                // 
                console.log('Respuesta : ');
                console.log(`Precio:  ${args.precio}  Cantidad: ${args.cant}`);
                console.log(response);
            }

        })
    }
});