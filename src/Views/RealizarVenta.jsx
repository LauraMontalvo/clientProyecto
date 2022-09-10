import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap'
import Header from '../Components/Header';
import { useEffect, useState} from 'react';
import axios from 'axios';

const RealizarVenta = () => {
    const [productos, setProductos] = useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/productos')
        .then(res => {
            setProductos(res.data)
        })
    },[]);
    return(
        <div>
            <Header/>
            <div> 
                <div>

                </div>
                <h1>
                </h1> 
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
                                productos.map(     
                                    (producto,ind) => {
                                        return (
                                            <tr key={ind}>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.tipo}</td>
                                                <td>{producto.cantidad}</td>
                                                <td>${producto.precio}</td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default RealizarVenta;