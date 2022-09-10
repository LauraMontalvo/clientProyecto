import { useNavigate } from "react-router-dom";
import "../Styles/header.css"
const Header = (props) =>{
    //const {user} = props;
    const navigate = useNavigate();
    return(
        <div>
            <div className="nav">
                <h1 >El BODEGON <span> DORADO</span></h1>
                <ul className="nav-links">
                    <li><button className="boton" onClick={e=>navigate("/productos")} >Productos</button></li>
                    <li> <button className="boton" onClick={e=>navigate("/proveedores")} >Proveedores</button></li>
                    <li> <button className="boton" onClick={e=>navigate("/ventas")} >Ventas</button></li>
                    <li><button className="boton" onClick={e=>navigate("/")} >Salir de la Aplicacion</button> </li>
                </ul>
            </div >
        </div> 
    )
}

export default Header;