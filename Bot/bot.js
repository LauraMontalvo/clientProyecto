const TOKEN= '5766455854:AAEKGA3-S84KK_ZOAXfk9XAx9_9bq6T5r38'
const { Telegraf } = require('telegraf');
const bot = new Telegraf(TOKEN);
const web_link='https://loquacious-donut-f1f559.netlify.app/'
const axios = require('axios')

bot.hears('Usar app web',(ctx) => ctx.reply('Welcome',{
    reply_markup:{
        keyboard:[[{text: "web app",web_app:{url: web_link}}]]},
})
);

bot.command('start', ctx=>{
    startMessage(ctx)

})

function startMessage (ctx){

    const menuMessage='¿Sobre que requieres información?'
    bot.telegram.sendMessage(ctx.chat.id, menuMessage,{
        reply_markup:{
            keyboard:[
                [
                    {text: 'Proveedores'},
                    {text:'Productos'},
                    {text:'Usar app web'}
                ]
            ]
        
        }
    })

}

async function doproduct(ctx) {
    var res = await axios({method:'get',url: 'http://127.0.0.1:8000/api/productos'});
    var cont = 1
    res.data.forEach(element => {
        ctx.reply(
            "Producto "+ cont +": \n" +
            "\nNombre: "+ element.nombre + 
            "\nPrecio: $"+ element.precio + 
            "\nCantidad existente: "+ element.cantidad)
        
        cont = cont + 1;
    });
}

bot.hears ('Productos',(ctx)=>{
    ctx.reply("Esta es la lista de productos:");
    doproduct(ctx)
})

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

bot.hears('Proveedores',(ctx)=>{
    ctx.reply("Esta es la lista de proveedores:");
    Proveedores(ctx)
})
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

bot.command('Ventas',(ctx)=>{
    ctx.reply("Esta es la lista de facturas registradas:");
    Facturas(ctx)
})


bot.launch();