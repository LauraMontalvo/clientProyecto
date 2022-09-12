import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams, useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
import Header from '../Components/Header';
import { Form } from 'react-bootstrap';

const EditarProducto = () =>{
    const {id} = useParams();
    const[nombre, setNombre] = useState("");
    const[precio, setPrecio] = useState("");
    const[cantidad, setCantidad] = useState("");
    const[tipo, setTipo] = useState("");
    const navigate = useNavigate();
    const [updateError, setUpdateError] = useState(''); 
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/producto/${id}`)
        .then(res => {
            setNombre(res.data.nombre);
            setPrecio(res.data.precio);
            setCantidad(res.data.cantidad);
            setTipo(res.data.tipo);
            console.log(res.data); 
        })
        .catch(err => console.log(err))
    }, [id]);

    const handlerUpdateProducto = e => {
        //Función para realizar una petición PUT y actualizar un producto
        e.preventDefault(); 
        axios.put('http://localhost:8000/api/producto/'+ id, {nombre,precio,cantidad,tipo})
            .then(res => {
                //console.log(res)
                setUpdateError(res.data.m);
                //navigate('/')
            })
            .catch(res => {
                setUpdateError(res.data.msg);
                //console.log(res.data.msg)
            });
    }

    return (
        <div>
             <Header/>
             <h1>Editar producto</h1>
            <Form onSubmit={handlerUpdateProducto}> 
                <div align="center" className=''>
                <table>
                        <tr>
                            <td><p>Nombre:</p></td>
                            <td>
                                <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                            </td>
                        </tr>
                        <tr>
                                <td><p>Precio:</p></td>
                            <td>
                                <input type="text" onChange={(e) => setPrecio(e.target.value)} value={precio}/>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Cantidad:</p></td>
                            <td>
                                <input type="number" onChange={(e) => setCantidad(e.target.value) } value={cantidad} />
                            </td>
                        </tr>
                        <tr>
                            <td><p>Tipo:</p></td>
                            <td>
                                <select onChange={(e)=> {setTipo(e.target.value);console.log(tipo)}} >
                                    <option>Seleccione</option>
                                    <option>Bebidas alcoholicas</option>
                                    <option>Bebidas no alcoholicas</option>
                                    <option>Snacks</option>
                                    <option>Otros</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <div>
                    <p style={{color:'red'}}>{updateError}</p>
                    </div>
                </div>
                    <div className='btnseccion1'>
                        <Button color='primary' type="submit" className='btn'>Guardar</Button> <Button  color='primary' type="button"className='btn' onClick={e => navigate('/listaProductos')} >Cancelar</Button>
                    </div><br />
                <div>
                <h4><Link  to={"/principal"}>Volver a la página principal</Link></h4></div><br/>     
            </Form>
        </div>
    );
}
export default EditarProducto;