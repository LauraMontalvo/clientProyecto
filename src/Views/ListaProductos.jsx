import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { Table } from "reactstrap";
import Header from "../Components/Header";
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from "reactstrap";

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:8000/api/productos')
        .then(res => {
            setProductos(res.data.sort((a, b) => a.nombre.localeCompare(b.nombre)))
        })
    },[]);
    //const navigate = useNavigate();
    const deleteProducto = (_id) =>{
        axios.delete('http://localhost:8000/api/producto/'+_id)
        .then(res => {
            console.log(res);
            removeFromDom(_id);
        })
        .catch(err => console.log(err))
    }
    const removeFromDom = (productoId) => {
        setProductos(productos.filter(producto => producto._id !== productoId));
    }
    const editar = (id) => {
        navigate(id+'/edit');
    }
    return(
        <div>
            <Header/>
            <h1>Inventario</h1>
            <hr />
            <p align="center"><Button className="boton" onClick={e=>navigate("/nuevoProducto")} >Ingresar nuevo producto</Button> </p>
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    productos.map(
                        (producto,ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>{producto.cantidad}</td>
                                    <td>{producto.tipo}</td>
                                    <td>
                                        <Button  className='btnEdit' onClick={(e) => {editar(producto._id)}}>Editar</Button> <Button color="danger" className='btnDelete' onClick={(e) => {deleteProducto(producto._id)}} >Eliminar</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ListaProductos;