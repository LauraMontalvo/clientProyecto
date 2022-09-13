const TOKEN= '5520542169:AAHUQWaX_zEL5lSnEkOwFebZ8t4OdOEKHcc'
const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf(TOKEN);
const web_link='https://loquacious-donut-f1f559.netlify.app/'
const axios = require('axios')

async function Proveedores(ctx) {
    var res = await axios({method:'get',url: 'http://127.0.0.1:8000/api/proveedores'});
    var cont = 1
    res.data.forEach(element => {
        ctx.reply(
            "Proveedor "+ cont +": \n" +
            "\nNombre: "+ element.nombreProveedor + 
            "\nTelefono: "+ element.telefonoProveedor + 
            "\nDireccion: "+ element.direccionProveedor +
            "\nR.U.C.: "+ element.rucProveedor)
        
        cont = cont + 1;
    });
}

async function Facturas(ctx) {
    var res = await axios({method:'get',url: 'http://127.0.0.1:8000/api/facturas'});
    var cont = 1
    res.data.forEach(element => {
        ctx.reply(
            "Venta #"+ cont +": \n" +
            "\nNombre cliente: "+ element.nombreCliente + 
            "\nDireccion: "+ element.direccion + 
            "\nTelefono: "+ element.telefono +
            "\nTotal vendido: $"+ element.total)
            cont = cont + 1;
        });
    }

    async function Detalle(ctx) {
        var id = ctx.update.message.text.split(' ')[1];
        var res = await axios({method:'get',url: 'http://127.0.0.1:8000/api/factura/'+id});
        var detalles = await axios({method:'get',url: 'http://127.0.0.1:8000/api/detalles'});
        element = res.data;
        ctx.reply(
            "Datos Factura\n" +
            "\nNombre cliente: "+ element.nombreCliente + 
            "\nDireccion: "+ element.direccion + 
            "\nTelefono: "+ element.telefono +
            "\nTotal vendido: $"+ element.total + 
            "\n\nDetalle de la factura:")
        var cont = 1;
        console.log(detalles)
        detalles.data.forEach(element => {
            if(element.idFactura==id){
                ctx.reply(
                    "Detalle #"+ cont +": \n" +
                    "\nProducto: "+ element.nombreProducto + 
                    "\nCantidad: "+ element.cantidad + 
                    "\nSubtotal: $"+ element.subtotal)
                cont = cont + 1;
            }
        });        
    }
bot.command('proveedores',(ctx)=>{
    ctx.reply("Esta es la lista de proveedores:");
    Proveedores(ctx)
})

bot.command('ventas',(ctx)=>{
    ctx.reply("Esta es la lista de facturas registradas:");
    Facturas(ctx)
})

bot.command('detalleVenta',(ctx)=>{
    ctx.reply("Esta es el detalle de la venta:");
    Detalle(ctx)
})
bot.launch();