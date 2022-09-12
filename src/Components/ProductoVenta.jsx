import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {Table} from 'react-bootstrap'

const ProductoVenta = (props) => {
    const {productos,productosVender,setProductosVender} = props;
    const [filtrada,setFiltrada] = useState([]);
    const filtrarProductos = (e) => {
        if(e.target.value==="Mostrar todos"){
            setFiltrada(productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
        }else{
            setFiltrada(productos.filter(x => x.tipo === e.target.value).sort((a, b) => a.nombre.localeCompare(b.nombre)))
        }
    }

    const AgregarCompra = (idProd) => {
        axios.get(`http://127.0.0.1:8000/api/producto/${idProd}`)
        .then(res => {
            setProductosVender([...productosVender,res.data])
            console.log({Valores:productosVender})
        })
    }
    return(
        <div>
            <div> 
                <div> 
                    <h3>Filtrar por: </h3>
                    <select onChange={e=>{filtrarProductos(e)}}>
                        <option>Mostrar todos</option>
                        <option>Bebidas alcoholicas</option>
                        <option>Bebidas no alcoholicas</option>
                        <option>Snacks</option>
                        <option>Otros</option>
                    </select>
                </div>
            <h1>Productos en inventario:</h1>
                <div className='container'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Cantidad en inventario</th>
                                <th>Precio por unidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filtrada.map(     
                                    (producto,ind) => {
                                        return (
                                            <tr key={ind}>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.tipo}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>${producto.precio}</td>
                                                <td><button onClick={e=>AgregarCompra(producto._id)}>Agregar al carrito</button></td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ProductoVenta;