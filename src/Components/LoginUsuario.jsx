import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const LoginForm = (props) => {
    const [ NombreUsuario, setNombreUsuario] = useState("");
    const [ password, setPassword] = useState("");
   
    const [ NombreUsuarioError, setNombreUsuarioError] = useState("");
   
    const [ passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handlerCreateUsuario= (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/usuario/validate', { NombreUsuario, password })
            .then(res => {
                console.log(res.data);
                navigate('/principal');
                if(res.data.confirm === true){
                   
                }
            })
            .catch(err => {
                
            })
    }
return (
        <Form onSubmit={handlerCreateUsuario}>
                <div className='contenedor1'>
                    <h2>Login</h2>
                    <p>Nombre:</p>
                    <input type="text" onChange={e => { setNombreUsuario(e.target.value) }} value={NombreUsuario} />
                    <p>{NombreUsuarioError}</p>
                    <p>Password</p>
                    <input type="password" onChange={e => { setPassword(e.target.value) }} value={password} />
                    <p>{passwordError}</p>
                    <div>
                        <Link  to={"/registrar/"}>  Registrarse </Link>
                    </div>

                    <div>
                        <button type='submit' className="botonsubmit">Iniciar Sesion</button>
                    </div>
                    <p>{passwordError}</p>
                   
                </div>
        </Form>
)
}
export default LoginForm;