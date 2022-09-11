import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

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
        <Form onSubmit={handlerLogin}>
                <div className='contenedor1'>
                    <h2>Login</h2>
                    <p>Nombre:</p>
                    <input type="text" onChange={e => { setNombreUsuario(e.target.value) }} value={NombreUsuario} />
                    <p>Password</p>
                    <input type="password" onChange={e => { setPassword(e.target.value) }} value={password} />
                    <div>
                        <Link to={"/registrar/"}>  Registrarse </Link>
                    </div>

                    <div>
                        <button type='submit' className="botonsubmit">Iniciar Sesion</button>
                    </div>
                    <p>{loginStatus}</p>
                   
                </div>
        </Form>
    )
}
export default LoginForm;