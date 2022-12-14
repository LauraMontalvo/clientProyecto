import {React, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link,useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
const ProveedorUpdate = () =>{
    const {id} = useParams()
    const [nombreProveedor,setNombreProveedor]=useState("");
    const [telefonoProveedor,setTelefonoProveedor]=useState("");
    const [direccionProveedor,setDireccionProveedor]=useState("");
    const [rucProveedor,setRucProveedor]=useState("");
    const navigate = useNavigate();
    const [updateError, setUpdateError] = useState(''); 

    const goToProv=()=>{
        navigate("/proveedor");
        //hola
    }

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
        .then(
            res => {console.log(res)
            setUpdateError("Se ha actualizado correctamente");
            setTimeout(goToProv,1000)
        })
        .catch(err => {
            setUpdateError("Revise las entradas y vuelva a intentarlo");
            console.log(err)
        
        })
    } 

    return(
        
        <div>
            <Header/>
            <form >
            <h1> Editar proveedor</h1>
            <table align="center">
                    <tr>
                        <td><p> Name:</p></td>
                        <td>
                            <input type="text" name="name" value={nombreProveedor} onChange={(e)=> setNombreProveedor(e.target.value)} />
                            
                        </td>
                    </tr>
                    <tr>
                        <td><p> Telefono:</p></td>
                        <td>
                            <input type="text" name="telefono" value={telefonoProveedor} onChange={(e)=> setTelefonoProveedor(e.target.value)} />

                        </td>
                    </tr>
                    <tr>
                        <td><p> Direcci??n:</p></td>
                        <td>
                            <input type="text" name="direccion" value={direccionProveedor} onChange={(e)=> setDireccionProveedor(e.target.value)} />

                        </td>
                    </tr>
                    <tr>
                        <td><p>RUC:</p></td>
                        <td>
                            <input type="text" name="ruc" value={rucProveedor} onChange={(e)=> setRucProveedor(e.target.value)} />

                        </td>
                    </tr>
                </table>
                <div>
                    <p style={{color:'red'}}>{updateError}</p>
                    </div>
            <Button color="primary" onClick={handlerUpdateProveedor} > Guardar </Button> <Link to={"/proveedor"} ><Button color="primary">Cancel</Button></Link>
        </form>  
        </div>
    );
}

export default ProveedorUpdate;