import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginUsuario';
import RegisterUsuario from './Views/RegistroUsuario';

import Main from './Views/Main';
import Ventas from './Views/Ventas';
import ListaFacturas from './Views/ListaFacturas';
import DetalleFactura from './Views/DetalleFactura';
import RealizarVenta from './Views/RealizarVenta';
import RegistrarProducto from './Views/RegistroProducto';
import EditarProducto from './Views/EditarProducto';

import ListaProductos from './Views/ListaProductos';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginForm/>}/>
            <Route exact path="/registrar" element={<RegisterUsuario/>}/>
            <Route path = '/principal' element={<Main/>}/>
            <Route path="/ventas" element={<Ventas/>} />
            <Route path='/historial' element={<ListaFacturas/>}/>
            <Route exact path='/detalleFactura/:id' element={<DetalleFactura/>} />


            <Route exact path="/productos" element={<RegistrarProducto />}/>
      
            <Route  path='/listaproductos' element={<ListaProductos/>} />
            <Route exact path="/listaproductos/:id/edit" element = {<EditarProducto/>}/>
            ss
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
