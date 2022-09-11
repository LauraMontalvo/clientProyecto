import {React, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProveedorUpdate = () =>{
    const {id} = useParams()
    const [nombreProveedor,setNombreProveedor]=useState("");
    const [telefonoProveedor,setTelefonoProveedor]=useState("");
    const [direccionProveedor,setDireccionProveedor]=useState("");
    const [rucProveedor,setRucProveedor]=useState("");

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/proveedor/"+id)
        .then(res =>{
            setNombreProveedor(res.data.nombreProveedor)
            setTelefonoProveedor(res.data.telefonoProveedor)
            setDireccionProveedor(res.data.direccionProveedor)
            setRucProveedor(res.data.rucProveedor)

        })
        .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handlerUpdateProveedor = (e) =>{
        e.preventDefault()
        axios.put("http://127.0.0.1:8000/api/proveedor/"+id,{nombreProveedor,telefonoProveedor, direccionProveedor,rucProveedor })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } 

    return(
        <div>
            <form >
            <h1> Proveedores </h1>
            <p>Editar el proveedor {nombreProveedor}:</p>
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
            <button onClick={handlerUpdateProveedor} > <Link to={"/"}>Submit </Link></button>
            <Link to={"/"} ><button > Cancel</button></Link>
        </form>
            
        </div>
    );
}

export default ProveedorUpdate;