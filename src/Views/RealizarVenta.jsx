import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import Header from '../Components/Header';
import { useEffect, useState} from 'react';
import axios from 'axios';
import ProductoVenta from '../Components/ProductoVenta';
import { useNavigate } from 'react-router-dom';

const RealizarVenta = () => {
    const [productos, setProductos] = useState([]);
    const [productosVender, setProductosVender] = useState([])
    const [nombreCliente, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    var ultimaFactura = [];
    var total = 0;
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/productos')
        .then(res => {
            setProductos(res.data)
        })
    },[]);

    const Eliminar = (prod) => {
        var index = productosVender.indexOf(prod);
        if (index > -1) {
            productosVender.splice(index, 1);
        }
        setProductosVender([...productosVender])
    }
    
    const CalcularTotal = () => {
        total = 0;
        productosVender.map(prod => { 
            return(
                total = total + +prod.precio
            );  
        })
        console.log(total.toFixed(3))
    }

    const GenerarFactura = () => {
        CalcularTotal();
        console.log({Valores:productosVender})
        console.log("Datos Factura:",{nombre:nombreCliente,direccion:direccion,telefono:telefono})
        axios.post(`http://127.0.0.1:8000/api/factura/new`, {nombreCliente,direccion,telefono,total})
            .then(res => {
                //console.log(res.data.insertedFactura)
                ultimaFactura = res.data.insertedFactura;
                console.log({FacturaCreada:ultimaFactura})
            }
        );
        productosVender.map(producto => {
            return(
                axios.get(`http://127.0.0.1:8000/api/producto/${producto._id}`)
                    .then(returnedProd =>{
                        if(+returnedProd.data.cantidad > 0){
                            let nombreProducto = returnedProd.data.nombre;
                            let nombre = nombreProducto;
                            let precio = returnedProd.data.precio;
                            let subtotal = returnedProd.data.precio;
                            let cantidad = 1;
                            let tipo = returnedProd.data.tipo
                            let idFactura = ultimaFactura._id;
                            console.log({DetalleInsertar:idFactura, nombreProducto, cantidad, subtotal})
                            axios.post(`http://127.0.0.1:8000/api/detalle/new`, {idFactura, nombreProducto, cantidad, subtotal})
                            .then(res => console.log({DetalleInsertado: res.data}))
                            cantidad = +returnedProd.data.cantidad-1
                            axios.put(`http://127.0.0.1:8000/api/producto/${returnedProd.data._id}`,{nombre, precio, cantidad, tipo})
                            .then(res => console.log(res.data))
                            navigate(`/detalleFactura/${idFactura}`)
                        }
                    })
                );
        })
    }

    return(
        <div>
            <Header/>
            <ProductoVenta productos={productos} productosVender={productosVender} setProductosVender={setProductosVender}/>
            {productosVender.length!==0 ?<h1>Productos en el carrito:</h1>:<h1>Agregue productos al carrito</h1>}
            <Table>
                {productosVender.length!==0 ?
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio por unidad</th>
                        </tr>
                    </thead>:<thead></thead>
                }
                <tbody>
                    {
                        productosVender.map(     
                            (producto,ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.tipo}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>${producto.precio}</td>
                                        <td><button onClick={e=>Eliminar(producto)}>Eliminar del carrito</button></td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </Table>
            {productosVender.length!==0 ? 
            <div>
                <h1>Datos del cliente para la facturación:</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><h4> Nombre completo: </h4></td>
                            <td><input type="text" onChange={e=>setNombre(e.target.value)} value={nombreCliente}/></td>
                        </tr>
                        <tr>
                            <td><h4> Dirección: </h4></td>
                            <td><input id='direccion' type="text" onChange={e=>setDireccion(e.target.value)} value={direccion}/></td>
                        </tr>
                        <tr>
                            <td><h4> Teléfono: </h4></td>
                            <td><input id='telefono' type="text" onChange={e=>setTelefono(e.target.value)} value={telefono}/></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={GenerarFactura}>Generar factura</button><br/><br/>
                
            </div>:<div></div>}
        </div>
    )
}

export default RealizarVenta;