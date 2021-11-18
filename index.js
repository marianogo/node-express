const express = require('express')
const {Contenedor,Producto} = require('./productosApi')
const app = express()

const PORT  = 8080

productos = [ 
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        title: "Globo Terraqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }

]



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puesto ${server.address().port}`);
})

server.on("error",error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send({mensaje: 'Hola mundo'})
})

app.get('/productos', async (req, res, next) => {
    try{
        contenedor = new Contenedor('productos.txt');
        const prods = await contenedor.getByAll2()
        res.send(prods)
    } catch(error){
        next(error)
    }
})

app.get('/productosRandom', async(req, res, next) => {
    try{
        contenedor = new Contenedor('productos.txt');
        const prods = await contenedor.getByAll2()
        jsonProds = JSON.parse(prods)
        res.send(jsonProds[Math.floor(Math.random()*jsonProds.length)])
    } catch(error){
        next(error)
    }
})