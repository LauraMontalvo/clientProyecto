import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Lista from "../Components/ListaProveedores";

const Proveedores = () => {
  //Declaración de variables de estado
  const [proveedor, setProveedor] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();


  //Función para actualizar el DOM
  const updateDom = (proveedorId) => {
    setProveedor(proveedor.filter((proveedor) => proveedor._id !== proveedorId));
  };

  //Método para obtener y cargar información
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/proveedores")
      .then((res) => setProveedor(res.data));
    setLoaded(true);
  }, []);

  return (
    <div>
        <div >
        <h1>Proveedores</h1>
      </div>
      
      <p align="right">  <button className="boton" onClick={e=>navigate("/proveedor/new")} >Ingresar nuevo Proveedor</button> </p>
      
        
        <div>
        {loaded && <Lista proveedor={proveedor} updateDom={updateDom} />}
        </div>

    </div>
  );
};

export default Proveedores;