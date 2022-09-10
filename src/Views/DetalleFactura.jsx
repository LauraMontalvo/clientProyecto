import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { Table } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../Components/Header";

const DetalleFactura = () => {
    const {id} = useParams();
    const [factura, setFactura] = useState([]);
    const [detallesFactura, setDetallesFactura] = useState([]);
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/factura/${id}`)
        .then(res => {
            setFactura(res.data)
        })
    },[id]);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/detalles")
        .then(res=>setDetallesFactura(res.data))
    },[])

    return(
        <div>
            <Header/>
            <h1>Datos Factura</h1>
            <hr />
            <Table>
                <thead>
                    <th><h3>Número de factura: </h3></th>
                    <th><h3>Nombre: </h3></th>
                    <th><h3>Dirección</h3></th>
                    <th><h3>Teléfono</h3></th>
                </thead>
                <tbody>
                    <td><p>{id}</p></td>
                    <td><p>{factura.nombreCliente}</p></td>
                    <td><p>{factura.direccion}</p></td>
                    <td><p>{factura.telefono}</p></td>
                </tbody>
            </Table>
            <hr />
            <div className="container"> 
                <Table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        detallesFactura.map(
                            (detalle,ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{detalle.idFactura===id ? <p>{detalle.nombreProducto}</p>:<p></p>}</td>
                                        <td>{detalle.idFactura===id ? detalle.cantidad:<p></p>}</td>
                                        <td>{detalle.idFactura===id ? detalle.subtotal:<p></p>}</td>
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

export default DetalleFactura;