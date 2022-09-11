import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Header from '../Components/Header';
const ProveedorIngresar = () => {
    const [nombreProveedor,setNombreProveedor]=useState("");
    const [telefonoProveedor,setTelefonoProveedor]=useState("");
    const [direccionProveedor,setDireccionProveedor]=useState("");
    const [rucProveedor,setRucProveedor]=useState("");
    const navigate = useNavigate();
    
    const goToProv=()=>{
        navigate("/proveedor");
    }

    const onSubmitHandler= e =>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/proveedor/new',{nombreProveedor,telefonoProveedor,direccionProveedor,rucProveedor})
            .then(res => {console.log("Petición exitosa: ", res)
            setTimeout(goToProv,1000)
        })
        .catch(err => console.log("Petición fallida:", err))
    }

    return(
        <div>
            <Header/>
            <form >
                <h1> Formulario Proveedores</h1>
                <p>Añadir Proveedores:</p>
                <label> Name:</label>
                <input type="text" name="name" value={nombreProveedor} onChange={(e)=> setNombreProveedor(e.target.value)} />
                <br/>
                <label> Telefono:</label>
                <input type="text" name="telefono" value={telefonoProveedor} onChange={(e)=> setTelefonoProveedor(e.target.value)} />
                <br/>
                <label> Dirección:</label>
                <input type="text" name="direccion" value={direccionProveedor} onChange={(e)=> setDireccionProveedor(e.target.value)} />
                <br/>
                <label> Ruc:</label>
                <input type="text" name="ruc" value={rucProveedor} onChange={(e)=> setRucProveedor(e.target.value)} />
                <br/>
                <button onClick={onSubmitHandler} > Create </button>
                <button onClick={e => navigate('/proveedor')} > Cancel</button>
            </form>
        </div>
    );
}
export default ProveedorIngresar;