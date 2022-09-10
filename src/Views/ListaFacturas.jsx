import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { Table } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../Components/Header";

const ListaFacturas = () => {
    const [facturas, setFacturas] = useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/facturas')
        .then(res => {
            setFacturas(res.data)
        })
    },[]);
    const navigate = useNavigate();
    
    return(
        <div>
            <Header/>
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>Número de factura</th>
                            <th>Nombre cliente</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    facturas.map(
                        (factura,ind) => {
                            return (
                                <tr key={ind}>
                                    <td>{factura._id}</td>
                                    <td>{factura.nombreCliente}</td>
                                    <td>{factura.direccion}</td>
                                    <td>{factura.telefono}</td>
                                    <td>{factura.total}</td>
                                    <td><button onClick={e=>navigate(`/detalleFactura/${factura._id}`)}>Mostrar detalle</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ListaFacturas;