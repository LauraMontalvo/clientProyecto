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
import Proveedores from './Views/Proveedores';
import ProveedorIngresar from './Views/ProveedorIngresar';
import ProveedorUpdate from './Views/ProveedorUpdate';

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
            <Route exact path='/detalleFactura/:id' element={<DetalleFactura/>}/>
            <Route path="/vender" element={<RealizarVenta/>}/>
            <Route exact path="/listaProductos" element={<ListaProductos />}/>
            <Route  path='/nuevoProducto' element={<RegistrarProducto/>} />
            <Route exact path="/listaproductos/:id/edit" element = {<EditarProducto/>}/>
            <Route exact path="/proveedor" element={<Proveedores/>}/>
            <Route exact path="/proveedor/new" element={<ProveedorIngresar/>}/>
            <Route exact path="/edit/:id" element={<ProveedorUpdate/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
