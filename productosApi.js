const fs = require('fs');
class Producto {

    constructor(title,price,thumbnail){
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
}
class Contenedor {
    static productos = [];
    static generadorId = 1;
    
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
    }
   
    async save(producto){
        try {
            producto.id = Contenedor.generadorId++;
            Contenedor.productos.push(producto)
            const espera = await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(Contenedor.productos,null,2))
            return producto.id;
            
        } catch (error){
            console.log(error)
        }
    }

    getById(idProducto){
        return Contenedor.productos.find(prod => prod.id === idProducto)
    }

    async getByAll2(){
        try {
            const all = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            return all;
        } catch (error){
            console.log(error);
        }
    }

    async getByAll(){
        try {
            await fs.promises.readFile(this.nombreArchivo,'utf-8').then(
                productos => {
                   console.log(productos)
                    return JSON.parse(productos)
                }
            )
        } catch (error){
            console.log(error);
        }
    }

    async deleteById(idProducto){
        const newProductos = Contenedor.productos.filter(prod => prod.id !== idProducto)
        await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(newProductos))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.nombreArchivo,'')
    }
}
module.exports = { Contenedor,Producto}
//contenedor = new Contenedor('./archivo.txt');
///producto1 = new Producto('tit1',31.4,'url1')
//contenedor.save(producto1).then(value=>console.log(value))

//producto2 = new Producto('tit2',32.4,'url2')
//contenedor.save(producto2).then(value=>console.log(value))

//producto3 = new Producto('tit3',33.4,'url3')
//contenedor.save(producto3).then(value=>console.log(value))

// obtiene todos
// obtiene 1
//setTimeout(()=>{
//    const prods = contenedor.getByAll()
//    prods.then(values =>{
//        console.log(contenedor.getById(1))
//    } )
//},1000)

// delete by Id
//setTimeout(()=>{
//    contenedor.deleteById(3).then(o => console.log(o))
//},3000)

// deleteAll
//setTimeout(()=>{
//    contenedor.deleteAll().then(value => {
//        console.log(value);
//    })
//},5000)