import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import loginFondo from '../img/loginFondo.jpg'
import '../Styles/loginstyle.css'

const RegisterUsuario = (props) => {
    const [ NombreUsuario, setNombreUsuario] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ aviso, setAviso ] = useState("");
    const [ emailError, setEmailError] = useState("");
    const [ NombreUsuarioError, setNombreUsuarioError] = useState("");
    const [ passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const onsubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/usuario/new', { NombreUsuario,email, password, confirmPassword })
        .then(res => {
            console.log(res);
            setNombreUsuario("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAviso("Usuario creado con exito!!");
            setNombreUsuarioError("");
            setEmailError("");
            setPasswordError("");
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            if (Object.keys(errorResponse).includes('NombreUsuario')) {
                setNombreUsuarioError(errorResponse['NombreUsuario'].message);
            }
          
            if (Object.keys(errorResponse).includes('email')) {
                setEmailError(errorResponse['email'].message);
            }
            if(Object.keys(errorResponse).includes('password')) {
                setPasswordError(errorResponse['password'].message);
            }  
            else {
                setAviso("");
            }
        })  
    }

    return (
        <div className='body'>
            <img className='fondoLogin' src={loginFondo} alt="fondo" />
            <Form className='form-box' onSubmit={onsubmitHandler}>
            <h2>Informacion de usuario</h2>
                <div className=''>
                    <table>
                        <tr>
                            <td><p>Usuario:</p></td>
                            <td>
                                <input type="text" onChange={e => setNombreUsuario(e.target.value)} value={NombreUsuario} />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:'red'}}>{NombreUsuarioError}</p></td>
                        </tr>
                        <tr>
                            <td><p>Email:</p></td>
                            <td>
                                <input type="email" onChange={e => setEmail(e.target.value)} value={email}/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:'red'}} >{emailError}</p></td>
                        </tr>
                        <tr>
                            <td><p>Contraseña:</p></td>
                            <td>
                                <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:'red'}}>{passwordError}</p></td>
                        </tr>
                        <tr>
                            <td><p>Confirmar contraseña:</p></td>
                            <td>
                                <input type="password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} /> 
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><p style={{color:'red'}}>{passwordError}</p></td>
                        </tr>
                    </table>
                </div>
                    <div><Button type='submit' className="botonsubmit" >Crear cuenta</Button> <Button onClick={e=>navigate("/")}>Cancelar</Button></div>
                <h4>{aviso}</h4>  
            </Form>
        </div>
        
    )
}

export default RegisterUsuario;