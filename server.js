const soap = require('soap');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express();

//Middlewares
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

app.set('views', path.join(__dirname, 'views'))

//Routes
app.use('/', require('./routes/index'))

var service = {
    BMI_Service: {
        BMI_Port: {
            calculateBMI: function (args) {
                const { nombre, cantidad, precio } = args
                let total = 0;
                const a = 'S/. ';
                console.log('args',args)

                console.log("***** COMPRA *****")

                for (let i = 0; i < cantidad.length; i++) {
                    total += parseFloat(precio[i]) * parseInt(cantidad[i])
                }

                return {
                    precioTotal: `${a} ${total}`,
                };

            }
        }
    }
}
// xml data is extracted from wsdl file created
const xml = require('fs').readFileSync('./bmicalculator.wsdl', 'utf8');

//create an express server and pass it to a soap server
const server = app.listen(3030, function () {
    const host = "127.0.0.1";
    const port = server.address().port;
});

soap.listen(server, '/bmicalculator', service, xml, function () {
    console.log('server initialized');
});