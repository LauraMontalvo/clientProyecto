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
            <Link to={'/'} className='link'>Ir al incicio</Link>
            <Form onSubmit={handlerUpdateProducto}> 
                <div className=''>
                    <p>Nombre:</p>
                    <input type="text" onChange={(e) => { setNombre((e.target.value)) }} value={nombre} />
                    <p>Precio:</p>
                    <input type="text" onChange={(e) => { setPrecio((e.target.value)) }} value={precio}/>
                    <p>Cantidad:</p>
                    <input type="number" onChange={(e) => { setCantidad((e.target.value)) }} value={cantidad} />
                    <p>Tipo:</p>
                    <select onChange={(e)=> {setTipo((e.target.value))}}>
                        <option>Seleccione</option>
                        <option>Bebidas alcoholicas</option>
                        <option>Bebidas no alcoholicas</option>
                        <option>Snacks</option>
                        <option>Otros</option>
                    </select>
                    <div>
                    <p>{updateError}</p>
                    </div>
                </div>
                    <div><Link  to={"/principal"}>  Ir a la pagina Principal </Link></div>
                    <div className='btnseccion1'>
                        <Button color='primary' type="submit" className='btn'>Guardar</Button>
                        <Button  color='primary' type="button"className='btn' onClick={e => navigate('/principal')} >Cancel</Button>
                    </div><br />
                <div>
                    <Button color="primary" type="button" className='btn' onClick={(e) => navigate('/listaproductos')}>Ver Productos Registrados</Button>
                </div>      
            </Form>
        </div>
    );
}
export default EditarProducto;