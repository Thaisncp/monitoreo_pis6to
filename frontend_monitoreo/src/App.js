import './App.css';
import {  Route,  Routes} from 'react-router-dom';
import Login from './fragment/Login';
import Graficas from './fragment/Graficas';
import Principal from './fragment/Principal';
import Usuarios from './fragment/Usuarios';
import Perfil from './fragment/Perfil';

function App() {
  return (
    <Routes> 
        <Route path='/' element={<Principal/>} />
        <Route path='/iniciar-sesion' element={<Login/>} />
        <Route path='/graficas' element={<Graficas/>} />
        <Route path='/usuarios' element={<Usuarios/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
    </Routes>
  );
}

export default App;