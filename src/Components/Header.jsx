import { useNavigate } from "react-router-dom";
import "../Styles/header.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
const Header = (props) =>{
    //const {user} = props;
    const navigate = useNavigate();
    return(
        <div>
            <div className="nav">
                <h1 >El BODEGON <span> DORADO</span></h1>
                <ul className="nav-links">
                    <li><Button  className="boton" onClick={e=>navigate("/listaProductos")} >Productos</Button></li>
                    <li><Button  className="boton" onClick={e=>navigate("/proveedor")} >Proveedores</Button></li>
                    <li><Button  className="boton" onClick={e=>navigate("/ventas")} >Ventas</Button></li>
                    <li><Button  className="boton" onClick={e=>navigate("/")} >Salir de la Aplicacion</Button> </li>
                </ul>
            </div >
        </div> 
    )
}

export default Header;