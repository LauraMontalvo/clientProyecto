import Header from "../Components/Header"
import imgFondo from "../img/fondo.jpg" 
import "../Styles/Main.css"
import ListaProductos from "./ListaProductos"
const Main = () => {
    return(
        <div className="App">
            <Header/>
            <img className="imgFondo" src={imgFondo} alt="Licoreria el Bodegon Dorado"/>
        </div>
        
    )
}

export default Main;