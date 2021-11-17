const express = require('express')

const app = express()

const PORT  = 8082

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puesto ${server.address().port}`);
})

server.on("error",error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send({mensaje: 'Hola mundo'})
})