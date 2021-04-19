const router = require('express').Router()
const fs = require('fs')
const soap = require('soap');
const url = "http://localhost:3030/bmicalculator?wsdl";

const json_productos = fs.readFileSync('list/products.json', 'utf-8')
const productos = JSON.parse(json_productos)

let carrito = []

router.get('/', (req, res) => {
    res.render('inicio', { productos, carrito })
})

router.get('/add-carrito/:id', (req, res) => {
    const { id } = req.params

    const producto = productos.find(el => el.id === id)


    carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
    })


    res.redirect('/')

})

router.get('/remove-carrito/:nombre', (req, res) => {
    const { nombre } = req.params

    if (carrito.find(el => el.nombre === nombre)) {
        carrito.splice(carrito.indexOf(nombre), 1)
    }

    res.redirect('/')
})

router.post('/pagar', (req, res) => {
    console.log(req.body)

    let args = req.body

    soap.createClient(url, function (err, client) {

        if (err)
            console.error(err);
        else {
            client.calculateBMI(args, function (err, response) {
                if (err)
                    console.error(err);
                else {
                    // 
                    console.log('Pago Total : ');
                    // console.log(`Precio:  ${args.precio}  Cantidad: ${args.cant}`);
                    console.log(response);
                    res.json(response)
                }

            })
        }
    });

})

module.exports = router