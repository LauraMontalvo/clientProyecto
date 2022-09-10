import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const RegisterUsuario = (props) => {
   //const navigate = useNavigate();
    const [ NombreUsuario, setNombreUsuario] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();

   
    const [ aviso, setAviso ] = useState("");
    const [ emailError, setEmailError] = useState("");
    const [ NombreUsuarioError, setNombreUsuarioError] = useState("");
   
    const [ passwordError, setPasswordError] = useState("");


    const onsubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/usuario/new', { NombreUsuario,email, password, confirmPassword })
        .then(res => {
            console.log(res);
            setNombreUsuario("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAviso("User has been successfully created");
            
           
        
            
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            if (Object.keys(errorResponse).includes('NombreUsuario')) {
                setNombreUsuarioError(errorResponse['NombreUsuario'].message);
            }
          
            if (Object.keys(errorResponse).includes('email')) {
                setEmailError(errorResponse['email'].message);
            }
            if(Object.keys(errorResponse).includes('confirmPassword')) {
                setPasswordError(errorResponse['confirmPassword'].message);
            }  
            else {
                setAviso("");
            }
        })
            
    }
return (
        <Form onSubmit={onsubmitHandler}>
                <div className=''>
                    <p>Usuario:</p>
                    <input type="text" onChange={(e) => { setNombreUsuario((e.target.value)) }} value={NombreUsuario} />
                    <p>{NombreUsuarioError}</p>
                    <p>Email:</p>
                    <input type="email" onChange={(e) => { setEmail((e.target.value)) }} value={email}/>
                    <p>{emailError}</p>
                    <p>Password:</p>
                    <input type="password" onChange={(e) => { setPassword((e.target.value)) }} value={password} />
                    <p>{passwordError}</p>
                    <p>Confirm Password:</p>
                    <input type="password" onChange={(e) => { setConfirmPassword((e.target.value)) }} value={confirmPassword} />
                   
                </div>
                    <div><button type='submit' className="botonsubmit" >Crear cuenta"</button> </div>
                    <div>
                        <Link  to={"/"}>  Ir al Inicio </Link>
                       
                    </div>
                    
                    <p>{passwordError}</p>
                    <p>{aviso}</p>

          
                   
                
        </Form>
)
}
export default RegisterUsuario;