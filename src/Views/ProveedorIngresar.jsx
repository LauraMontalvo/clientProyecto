import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Header from '../Components/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
const ProveedorIngresar = () => {
    const [nombreProveedor,setNombreProveedor]=useState("");
    const [telefonoProveedor,setTelefonoProveedor]=useState("");
    const [direccionProveedor,setDireccionProveedor]=useState("");
    const [rucProveedor,setRucProveedor]=useState("");

//variables para errores
    const [nombreError, setNombreError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const [direccionError, setDireccionError] = useState("");
    const [rucError, setRucError] = useState("");
    const [statusCreacion, setStatusCreation] = useState("");


    const navigate = useNavigate();
    
    const goToProv=()=>{
        navigate("/proveedor");
    }

    const onSubmitHandler= e =>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/proveedor/new',{nombreProveedor,telefonoProveedor,direccionProveedor,rucProveedor})
            .then(res => {console.log("Petición exitosa: ", res)
            setStatusCreation("Proveedor ingresado con éxito")
            setTimeout(goToProv,1000)
        })
        .catch(err =>{ 
            
            const errorResponse = err.response.data.errors;
            if (Object.keys(errorResponse).includes('nombreProveedor')) {
                setNombreError(errorResponse['nombreProveedor'].message);
            }
            if (Object.keys(errorResponse).includes('telefonoProveedor')) {
                setTelefonoError(errorResponse['telefonoProveedor'].message);
            }
            if(Object.keys(errorResponse).includes('direccionProveedor')) {
                setDireccionError(errorResponse['direccionProveedor'].message);
            }  
            if(Object.keys(errorResponse).includes('rucProveedor')) {
                setRucError(errorResponse['rucProveedor'].message);
            } 
            else {
                setStatusCreation("");
            }   
            
            console.log("Petición fallida:", err)})
    }

    return(
        <div>
            <Header/>
            <form>
                <h1>Datos nuevo proveedor</h1>
                <table align="center">
                    <tr>
                        <td><p> Name:</p></td>
                        <td>
                            <input type="text" name="name" value={nombreProveedor} onChange={(e)=> setNombreProveedor(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{nombreError}</p></td>
                        </tr>
                    <tr>
                        <td><p> Telefono:</p></td>
                        <td>
                            <input type="text" name="telefono" value={telefonoProveedor} onChange={(e)=> setTelefonoProveedor(e.target.value)} />

                        </td>
                    </tr>
                    <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{telefonoError}</p></td>
                        </tr>
                    <tr></tr>
                    <tr>
                        <td><p> Dirección:</p></td>
                        <td>
                            <input type="text" name="direccion" value={direccionProveedor} onChange={(e)=> setDireccionProveedor(e.target.value)} />

                        </td>
                    </tr>
                    <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{direccionError}</p></td>
                        </tr>
                    <tr></tr>
                    <tr>
                        <td><p>RUC:</p></td>
                        <td>
                            <input type="text" name="ruc" value={rucProveedor} onChange={(e)=> setRucProveedor(e.target.value)} />

                        </td>
                    </tr>
                    <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{rucError}</p></td>
                            
                        </tr>
                    <tr></tr>
                    <tr>
                            <td></td>
                            <td><p style={{color:"red"}}>{statusCreacion}</p></td>
                            
                        </tr>
                    <tr></tr>
                </table>
                <Button color="primary" onClick={onSubmitHandler} > Agregar </Button> <Button color="primary" onClick={e => navigate('/proveedor')} > Cancelar</Button>
            </form>
        </div>
    );
}
export default ProveedorIngresar;