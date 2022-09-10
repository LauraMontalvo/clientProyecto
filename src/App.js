import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginUsuario';
import RegisterUsuario from './Views/RegistroUsuario';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginForm/>}/>
            <Route exact path="/registrar" element={<RegisterUsuario/>}/>
           
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
