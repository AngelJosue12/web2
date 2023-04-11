import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Crud_Usuarios from './Crud_Usuarios';
import Crud_Productos from './Crud_Productos';
import Inicio from './Inicio';
import Productos from './Productos';
import Login from './Login';
import Iot from './IOT';
 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio/>} exact></Route>
          <Route path='/Crud_Usuarios' element={<Crud_Usuarios/>} exact></Route>
          <Route path='/Crud_Productos' element={<Crud_Productos/>} exact></Route>
          <Route path='/Productos' element={<Productos/>} exact></Route>
          <Route path='/Login' element={<Login/>} exact></Route>
          <Route path='/Iot' element={<Iot/>} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
