import axios from 'axios';
import "../Styles/loginstyle.css"
import { Form } from 'react-bootstrap';
import avatar from '../img/usuario.png'
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {Button} from "reactstrap";
import loginFondo from '../img/loginFondo.jpg'

const LoginForm = (props) => {
    const [ NombreUsuario, setNombreUsuario] = useState("");
    const [ password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const navigate = useNavigate();

    const goToMain=()=>{
        navigate("/principal");
    }

    const handlerLogin= (e) => {
        e.preventDefault();
        if(password==="" || NombreUsuario===""){
            setLoginStatus("Ingrese su usuario y contraseña")
        }else{
            axios.post('http://localhost:8000/api/usuario/validate', { NombreUsuario, password })
            .then(res => {
                console.log(res);
                if(res.data.msg==="Usuario validado correctamente!!"){
                    setLoginStatus(res.data.msg);
                    setTimeout(goToMain,1000)
                }else{
                    setLoginStatus(res.data.msg)
                }
            })
            .catch(err => {
                console.log(err);
                setLoginStatus(err.msg)
            })
        }
    }

    return (
        <div className='body'>
            <img className='fondoLogin' src={loginFondo} alt="fondo" />
            <div class='login-box'>
            <img src={avatar} alt="Avatar" className="avatar" ></img> 
            <Form onSubmit={handlerLogin}>
                    <div >
                        <h2>Login</h2>
                        <p>Nombre:</p>
                        <input type="text" class="form-control"  onChange={e => { setNombreUsuario(e.target.value) }} value={NombreUsuario} />
                        <p>Password</p>
                        <input class="form-control" type="password" onChange={e => { setPassword(e.target.value) }} value={password} />
                        <div>
                            No tiene una cuenta? 
                            <Link to={"/registrar/"}>  Registrate </Link>
                            <br />
                        </div>
                        <br />
                        <div >
                            <Button className="boton"  color="primary" >Iniciar Sesion</Button> 
                        </div>
                        <p>{loginStatus}</p>
                    
                    </div>
                </Form>
            </div>
        </div>
        
        
    )
}
export default LoginForm;