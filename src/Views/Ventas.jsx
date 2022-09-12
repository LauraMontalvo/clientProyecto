import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap'
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
const Ventas = () => {
    const navigate = useNavigate();
    return(
        <div>
            <Header/>
            <div className='container'>  
                <Table>
                    <thead>
                        <tr>
                            <th><h1>Realizar una venta</h1></th>
                            <th><h1>Ver historial de ventas</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Button onClick={e=>navigate('/vender')}>Vender</Button></td>
                            <td><Button onClick={e=>navigate('/historial')}>Historial</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Ventas;