import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
import Header from '../Components/Header';
import { Form } from 'react-bootstrap';

const RegistrarProducto= (props) => {
   // const {createFromDom} = props;
    const[nombre, setNombre] = useState("");
    const[precio, setPrecio] = useState("");
    const[cantidad, setCantidad] = useState("");
    const[tipo, setTipo] = useState("");
    const navigate = useNavigate();
    //variables para errores
    const [nombreError, setNombreError] = useState("");
    const [precioError, setPrecioError] = useState("");
    const [cantidadError, setCantidadError] = useState("");
    const [tipoError, setTipoError] = useState("");
    const [statusCreacion, setStatusCreation] = useState("");
    const onSubmitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/producto/new', {nombre, precio, cantidad, tipo})
        .then(res => {
            //createFromDom(res.data.insertedProduct); 
            console.log(res);
            setCantidad("");
            setNombre("");
            setPrecio("");
            setTipo("");
            setCantidad("");
            setNombreError("");
            setPrecioError("");
            setCantidadError("");
            setTipoError("");
            setStatusCreation("Producto creado Exitosamente!!");
        })
        .catch(err => {
            //console.log('Petición fallida:', err));
            const errorResponse = err.response.data.errors;
            if (Object.keys(errorResponse).includes('nombre')) {
                setNombreError(errorResponse['nombre'].message);
            }
            if (Object.keys(errorResponse).includes('precio')) {
                setPrecioError(errorResponse['precio'].message);
            }
            if(Object.keys(errorResponse).includes('cantidad')) {
                setCantidadError(errorResponse['cantidad'].message);
            }  
            if(Object.keys(errorResponse).includes('tipo')) {
                setTipoError(errorResponse['tipo'].message);
            } 
            else {
                setStatusCreation("");
            }   
        })    
    }

    return (
        <div>
             <Header/>
             <h1>Datos nuevo producto</h1>
            <Form onSubmit={onSubmitHandler}>
                <div align="center" className=''>
                    <table>
                        <tr>
                            <td><p>Nombre:</p></td>
                            <td>
                                <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{nombreError}</p></td>
                        </tr>
                        <tr>
                                <td><p>Precio:</p></td>
                            <td>
                                <input type="text" onChange={(e) => setPrecio(e.target.value)} value={precio}/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{precioError}</p></td>
                        </tr>
                        <tr>
                            <td><p>Cantidad:</p></td>
                            <td>
                                <input type="number" onChange={(e) => setCantidad(e.target.value) } value={cantidad} />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{cantidadError}</p></td>
                        </tr>
                        <tr>
                            <td><p>Tipo:</p></td>
                            <td>
                                <select onChange={(e)=> setTipo(e.target.value)} >
                                    <option>Seleccione</option>
                                    <option>Bebidas alcoholicas</option>
                                    <option>Bebidas no alcoholicas</option>
                                    <option>Snacks</option>
                                    <option>Otros</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{tipoError}</p></td>
                        </tr>
                    </table>
                    </div>
                    <div>
                        <Button color="primary" >Crear Producto</Button>  <Button color="primary" type="button" className='btn' onClick={(e) => navigate('/listaProductos')}>Cancelar</Button>
                    </div><br />
                    <div>
                        <Button color="primary" type="button" className='btn' onClick={(e) => navigate('/listaProductos')}>Ver Productos Registrados</Button>
                    </div>
                    <p style={{color:"green"}}>{statusCreacion}</p>
                    <div><h4><Link  to={"/principal"}>Volver a la página principal</Link></h4></div>   
            </Form>
    </div>       
    );
}
export default RegistrarProducto;