import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap'
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

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
                            <td><button onClick={e=>navigate('/vender')}>Vender</button></td>
                            <td><button onClick={e=>navigate('/historial')}>Historial</button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Ventas;