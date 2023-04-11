import React,{ useState,useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.css"
import validator from "validator"
import {Table,Button,Container,Input} from "reactstrap"
import Modal_Agregar_Producto from "./modales/Modal_Agregar_Producto"
import Modal_Editar_Producto from "./modales/Modal_Editar_Producto"
import Modal_Eliminar_Producto from "./modales/Modal_Eliminar_Producto"
import styled from "styled-components"

const Crud_Productos=()=> {


    

    const [productos, setProductos] = useState([]);
    const [Id, setId] = useState('');
    const [Nombre, setNombre]= useState('');
    const [Precio, setPrecio]= useState('');
    const [Imagen, setImagen] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Existencias, setExistencias] = useState('');
    const [Categoria, setCategoria] = useState('');
    
    useEffect(() => {
        async function fetchData() {
        fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/products')
            .then(response => response.json())
            .then(data => setProductos(data));
        } fetchData();
    
        const intervalId = setInterval(() => {
        fetchData();
        }, 10000);
    
        return () => {
        clearInterval(intervalId);
        };
}, []);


function getProductDetailsForEdit(id) {
    fetch(`https://ecop-ah5318740-gmailcom.vercel.app/api/products/${id}`)
    .then(response => response.json())
    .then(data => {
        
        cambiarEstadoModal7(!estadoModal7);
        setId(data._id);
        setNombre(data.nombre);
        setPrecio(data.precio);
        setImagen(data.Imagen);
        setDescripcion(data.Descripcion);
        setExistencias(data.Existencias);
        setCategoria(data.categoria);
    });
}

const eliminar = async (id)=>{
    try{
      const envia =  await fetch(`https://ecop-ah5318740-gmailcom.vercel.app/api/products/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id:id,
        })
      })
      const data = await envia.json()
      console.log(data)
      alert('Producto eliminado con éxito.');

      cambiarEstadoModal8(!estadoModal8);
    } catch (error) {
      console.error(error)
    }
}

function getProductDetailsForEdit2(id) {
    fetch(`https://ecop-ah5318740-gmailcom.vercel.app/api/products/${id}`)
    .then(response => response.json())
    .then(data => {
        
        cambiarEstadoModal8(!estadoModal8);
        setId(data._id);
        setNombre(data.nombre);
        setPrecio(data.precio);
        setImagen(data.Imagen);
        setDescripcion(data.Descripcion);
        setExistencias(data.Existencias);
        setCategoria(data.categoria);
    });
}




const Crear=()=>{
    if(Imagen===''){
        alert('Error', 'Rellena los campos', 'error')
    }else{
        const formData = new FormData();
        formData.append('nombre', Nombre);
        formData.append('precio', Precio);
        formData.append('Imagen', Imagen);
        formData.append('Descripcion', Descripcion);
        formData.append('Existencias', Existencias);
        formData.append('categoria', Categoria)

        // Hacer una solicitud POST a la ruta para agregar un nuevo producto
        fetch('https://ecop.onrender.com/api/productsImage', {
        method: 'POST',
        body: formData
        })
        
        .then(response => response.json())
        .then(data => {
            console.log(data)
            cambiarEstadoModal6(!estadoModal6)
            alert('Producto registrado con éxito.');
            
        })
        
        .catch(error => console.error(error));
    
    } 
}
    const [estadoModal6, cambiarEstadoModal6] = useState(false);
    const [estadoModal7, cambiarEstadoModal7] = useState(false);
    const [estadoModal8, cambiarEstadoModal8] = useState(false);
    
    return (
        <>

            <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#fff"}}>
                <div class="container-fluid">
                    <img src="/img/logo3.png" alt="Bootstrap" width="50" height="50"></img>
                    <a class="navbar-brand " href="#">Eco-P</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/Crud_Usuarios">Crud de Usuarios</a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link" href="/">Cerrar Sesion</a>
                            </li>
                        </ul>
                         
                    </div>
                </div>
            </nav>
            <h2>Lista de Productos</h2>
            <ContenedorBotones>
            <Boton style={{backgroundColor:"#228B22"}} onClick={()=> cambiarEstadoModal6(!estadoModal6)}>Agregar Un Nuevo Usuario</Boton>
            </ContenedorBotones>
            <br />
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Descripcion</th>
                        <th>Existencia</th>
                        <th>Categoria</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                {productos.map(producto => (
                    <tr>
                        <td>{(producto._id)}</td>
                        <td>{(producto.nombre)}</td>
                        <td>{(producto.precio)}</td>
                        <td><img src={producto.Imagen} alt="Imagen del producto" style={{height:"150px", width:"180px"}} /></td>
                        <td>{(producto.Descripcion)}</td>
                        <td>{(producto.Existencias)}</td>
                        <td>{(producto?.categoria?.[0]?.name)}</td>
                        <td>
                            <Button color="warning" onClick={()=>getProductDetailsForEdit(producto._id)}>Editar</Button>
                            <Button color="danger" onClick={()=>getProductDetailsForEdit2(producto._id)} >Eliminar</Button>
                        </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            
                <Modal_Agregar_Producto estado={estadoModal6} cambiarEstadoModal6={cambiarEstadoModal6}>
                <Contenido>
                {/*<div class="input-group" style={{height:"35px", margin:"10px"}}>
                  <span class="input-group-text" id="basic-addon1" style={{backgroundColor: "#EAFAF1", height:"35px"}}>@</span>
                  <Input type="text" style={{ margin:"0 10px"}} class="form-control" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="basic-addon1"/>
              </div>*/}
                      <Input type="text" placeholder="Nombre del Producto" name='nombre' id='nombre' className="form-control"  onChange={(e)=> {setNombre(e.target.value)}}
            required
            ></Input>
                    <Input accept="image/*" type="file" className="form-control" defaultValue={Imagen} onChange={(e)=> {setImagen(e.target.files[0]); console.log(e.target.files[0])}} required></Input>

                    <Input type="number" placeholder="Precio del Producto" name='precio' id='precio' className="form-control" onChange={(e)=> {setPrecio(e.target.value)}}
                required
                ></Input>
            
            <Input type="text" name='descripcion' id='descripcion' placeholder="Descripcion del Producto" className="form-control"  onChange={(e)=> {setDescripcion(e.target.value)}}required></Input>
            <Input type="number" name='existencias' id='existencias'  placeholder="Existencias del Producto" className="form-control"  onChange={(e)=> {setExistencias(e.target.value)}}required></Input>
            <select className="form-select" onChange={(e)=> {setCategoria(e.target.value)}}>
                    <option value="640e91dd185d85ea1d79816f">Base de Bicarbonato</option>
                    <option value="640e91dd185d85ea1d79816f">Base de Bicarbonato</option>
                    <option value="6417f319bfac73fea0d95626">Base de Agua y Exencias De Frutas</option>
                    <option value="6417f33fbfac73fea0d95627">Base Salinas Ecologicas</option>
                </select>
                   
                    <Boton  style={{backgroundColor:"#228B22"}} onClick={Crear}>Agregar Producto</Boton>
                </Contenido>
            </Modal_Agregar_Producto>

  {/*Modal del Login */}
<Modal_Editar_Producto estado={estadoModal7} cambiarEstadoModal7={cambiarEstadoModal7}>
<Contenido>
                {/*<div class="input-group" style={{height:"35px", margin:"10px"}}>
                  <span class="input-group-text" id="basic-addon1" style={{backgroundColor: "#EAFAF1", height:"35px"}}>@</span>
                  <Input type="text" style={{ margin:"0 10px"}} class="form-control" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="basic-addon1"/>
              </div>*/}

            <Input type="text" placeholder="id del Producto" name='nombre' id='nombre' className="form-control" value={Id} onChange={(e)=> {setNombre(e.target.value)}}
            required
            ></Input>
                      <Input type="text" placeholder="Nombre del Producto" name='nombre' id='nombre' className="form-control" value={Nombre} onChange={(e)=> {setNombre(e.target.value)}}
            required
            ></Input>
                    <Input accept="image/*" type="file" className="form-control"onChange={(e)=> {setImagen(e.target.files[0]); console.log(e.target.files[0])}} required></Input>

                    <Input type="number" placeholder="Precio del Producto" name='precio' id='precio' className="form-control" value={Precio} onChange={(e)=> {setPrecio(e.target.value)}}
                required
                ></Input>
            
            <Input type="text" name='descripcion' id='descripcion' placeholder="Descripcion del Producto" className="form-control" value={Descripcion} onChange={(e)=> {setDescripcion(e.target.value)}}required></Input>
            <Input type="number" name='existencias' id='existencias'  placeholder="Existencias del Producto" className="form-control" value={Existencias} onChange={(e)=> {setExistencias(e.target.value)}}required></Input>
            <select className="form-select" onChange={(e)=> {setCategoria(e.target.value)}}>
                    <option value="640e91dd185d85ea1d79816f">Base de Bicarbonato</option>
                    <option value="640e91dd185d85ea1d79816f">Base de Bicarbonato</option>
                    <option value="6417f319bfac73fea0d95626">Base de Agua y Exencias De Frutas</option>
                    <option value="6417f33fbfac73fea0d95627">Base Salinas Ecologicas</option>
                </select>
                   
                    <Boton  style={{backgroundColor:"#228B22"}} >Editar Producto</Boton>
                </Contenido>
            </Modal_Editar_Producto>

  {/*Modal del Login */}
<Modal_Eliminar_Producto estado={estadoModal8} cambiarEstadoModal8={cambiarEstadoModal8}>
<Contenido>
                {/*<div class="input-group" style={{height:"35px", margin:"10px"}}>
                  <span class="input-group-text" id="basic-addon1" style={{backgroundColor: "#EAFAF1", height:"35px"}}>@</span>
                  <Input type="text" style={{ margin:"0 10px"}} class="form-control" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="basic-addon1"/>
              </div>*/}

            <Input type="text" placeholder="id del Producto" name='nombre' id='nombre' className="form-control" value={Id} onChange={(e)=> {setNombre(e.target.value)}}
            required
            ></Input>
                      <Input type="text" placeholder="Nombre del Producto" name='nombre' id='nombre' className="form-control" value={Nombre} onChange={(e)=> {setNombre(e.target.value)}}
            required
            ></Input>
                    <Input accept="image/*" type="file" className="form-control"onChange={(e)=> {setImagen(e.target.files[0]); console.log(e.target.files[0])}} required></Input>

                    <Input type="number" placeholder="Precio del Producto" name='precio' id='precio' className="form-control" value={Precio} onChange={(e)=> {setPrecio(e.target.value)}}
                required
                ></Input>
            
            <Input type="text" name='descripcion' id='descripcion' placeholder="Descripcion del Producto" className="form-control" value={Descripcion} onChange={(e)=> {setDescripcion(e.target.value)}}required></Input>
            <Input type="number" name='existencias' id='existencias'  placeholder="Existencias del Producto" className="form-control" value={Existencias} onChange={(e)=> {setExistencias(e.target.value)}}required></Input>
            <select className="form-select" onChange={(e)=> {setCategoria(e.target.value)}}>
                    <option value="640e91dd185d85ea1d79816f">Base de Bicarbonato</option>
                    <option value="640e91dd185d85ea1d79816f">Base de Bicarbonato</option>
                    <option value="6417f319bfac73fea0d95626">Base de Agua y Exencias De Frutas</option>
                    <option value="6417f33fbfac73fea0d95627">Base Salinas Ecologicas</option>
                </select>
                   
                    <Boton  style={{backgroundColor:"#228B22"}} onClick={()=>eliminar(Id)}>Confirmar</Boton>
                </Contenido>
            </Modal_Eliminar_Producto>
        
        </>
        
    
    )
}
  
export default Crud_Productos

const ContenedorBotones = styled.div`
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    `;
    
    const Boton = styled.button`
        display: block;
        padding: 4px 10px;
        border-radius: 5px;
        color: #fff;
        border:none;
        backgroundColor:#006400;
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        transition: .3s ease all;
    
        &:hover {
            background: #fff;
        }
    `;
    
    const Contenido = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    
        h1 {
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 10px;
        }

        input{
            margin: 10px;
        }
        select{
            margin:10px;
        }
    
        img {
            width: 100%;
            vertical-align: top;
            border-radius: 3px;
        }
    `;