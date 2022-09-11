//Importación de librerías requeridas
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";



//Definición de clase Lista
const ListaProveedores = (props) => {
  const { proveedor, updateDom } = props;

  //Método para borrar un proveedor basado en su id
  const deleteProveedor = (proveedorID) => {
    axios
      .delete("http://127.0.0.1:8000/api/proveedor/" + proveedorID)
      .then((res) => updateDom(proveedorID))
      .catch((err) => console.log("Error: ", err));
  };
  

  //Estructura html para mostrar la lista de proveedores en pantalla
  return (
    <div>
      
      <div>
        <h1>Lista de Proveedores:</h1>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Proveedores</th>
            <th>Acciones disponibles</th>
          </tr>
        </thead>
        <tbody>
          {proveedor.map((proveedor, idx) => {
            return (
              <tr key={idx + 2}>
                <td key={idx}>
                  <div className='lst' key={idx}>
                    {proveedor.nombreProveedor}
                  </div>
                </td>
                <td>
                  <button
                    key={idx + 1}
                    className='btnDel'
                    onClick={(e) => deleteProveedor(proveedor._id)}
                  >
                    Eliminar
                  </button>
                  <Link to={"/edit/"+proveedor._id} >
                  <button
                    key={idx + 1}
                    className='btnUpdate'  
                  >
                    Editar
                  </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListaProveedores;