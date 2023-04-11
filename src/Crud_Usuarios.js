import React,{ useState,useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Table,Button,Container,Input} from "reactstrap"
import "bootstrap/dist/css/bootstrap.css"
import validator from "validator"
import Modal_Agregar_Usuario from "./modales/Modal_Agregar_Usuario"
import Modal_Editar_Usuario from "./modales/Modal_Editar_Usuario"
import Modal_Eliminar_Usuario from "./modales/Modal_Eliminar_Usuario"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"


const Copia_Crud_Usuarios =()=> {


  
  const nav=useNavigate();
  
  const vacios=()=>{
    if(nombre=='' || correo==''||password==''||password2==''||telefono==''||respuesta==''||preguntaSecreta==''){
        alert('Rellene Los Campos');
    }
    else{
      verficarSiExiste();
    }
  }

  const vacios2=()=>{
    if(nombre=='' || correo==''||password==''||password2==''||telefono==''||respuesta==''||preguntaSecreta==''){
        alert('Rellene Los Campos');
    }
    else{
      actu2();
    }
  }

  const [users, setUsers] = useState([]);
  const [preguntaSecreta, setSelectedValue] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [telefono, setTelefono] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [rol, setRol] = useState("");
  const [id, setId] = useState("");
  const [img, setImg] = useState("");
  
  useEffect(() => {
    setInterval(() => {
      fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/usersR')
      .then(response => response.json())
      .then(data => setUsers(data));
    }, 1000)
    
  }, []);

  


  const verficarSiExiste=async()=>{
    try{
      const envia =  await fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/users/correoExistente',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:correo
          })
        })
      const data = await envia.json()
      if(data.message=='Este correo no existe'){
        insertUsuario()
      }else{
          existe()
      }
    
    }catch (error){
      console.error(error)
    }
  }

  const insertUsuario = async ()=>{
    
    if(validarCorreo(correo)){
       if(passwordIgua(password,password2)){
    
        if(rol=='Administrador'){
            var rol1=('641cf98605338c1dfd56a111');
        }else{
          var rol1=('641d06c9bb476876fc4c23ad')
        }

        
        
         try{
           const envia =  await fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/users',{
             method:'POST',
             headers:{
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               name: nombre,
               email:correo,
               password:password,
               tel:telefono,
               preguntaSecreta:preguntaSecreta,
               respuesta:respuesta,
               imagen:('https://res.cloudinary.com/dfkijykja/image/upload/v1679958790/imagenes/usuario_rsq7sz.png'),
               rol:rol1,
             })
           })
           const data = await envia.json()
           console.log(data)
           showToast()
           nav('/Crud_Usuarios');
           cambiarEstadoModal3(!estadoModal3);
          
         } catch (error) {
           console.error(error)
         }
       }   
       else{
         mensajePas()
       }
     }else{
       mensajeCorreo()
     }
   }
 
   const passwordIgua = (password,password1) => {
     if(password==password1){
       return true
     }else{
       return false
     }
   }
 
   const showToast = () => {
    alert('Usuario Registrado con exito');
   };

   const showToast2 = () => {
    alert('Datos actualizados con exito');
   };

   
   const showToast3= () => {
    alert('Eliminado con exito');
   };
   const existe = () => {
    alert('Este correo ya esta Registrado Intenta con Otro Correo');
    };

   const mensajeCorreo = () => {
    alert('Correo No Valido');
   };
 
   const mensajePas = () => {
    alert('Las Contraseñas No coinciden');
   };
 
 
   const validarCorreo = (correo) => {
     console.log(validator.isEmail(correo))
     return validator.isEmail(correo);
   }


  
   function getUserDetailsForEdit(id) {
    
    fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/users/'+id)
      .then(response => response.json())
      .then(data => {
     
        cambiarEstadoModal4(!estadoModal4);
        setId(data._id);
        setNombre(data.name);
        setCorreo(data.email);
        setPassword(data.password);
        setTelefono(data.tel);
        setSelectedValue(data.preguntaSecreta)
        setRespuesta(data.respuesta);
        setImg(data.imagen);

      

        if(data.rol=='641d06c9bb476876fc4c23ad')
        {
          setRol('Usuario');
        }else if (data.rol==''){
          setRol('') 
        }else{
          setRol('Administrador') 
        }
      
      });
  }
  const [estadoModal3, cambiarEstadoModal3] = useState(false);
  const [estadoModal4, cambiarEstadoModal4] = useState(false);
  const [estadoModal5, cambiarEstadoModal5] = useState(false);


  function getUserDetailsForEdit2(id) {
    
    fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/users/'+id)
      .then(response => response.json())
      .then(data => {
     
        cambiarEstadoModal5(!estadoModal5);
        setId(data._id);
        setNombre(data.name);
        setCorreo(data.email);
        setPassword(data.password);
        setTelefono(data.tel);
        setSelectedValue(data.preguntaSecreta)
        setRespuesta(data.respuesta);
        setImg(data.imagen);

      

        if(data.rol=='641d06c9bb476876fc4c23ad')
        {
          setRol('Usuario');
        }else if (data.rol==''){
          setRol('') 
        }else{
          setRol('Administrador') 
        }
      
      });
  }

 
  const actu2 = async (id)=>{
    
    if(validarCorreo(correo)){
       if(passwordIgua(password,password2)){
    
        if(rol=='Administrador'){
            var rol1=('641cf98605338c1dfd56a111');
        }else{
          var rol1=('641d06c9bb476876fc4c23ad')
        }

        
        
         try{
           const envia =  await fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/users/'+id,{
             method:'PUT',
             headers:{
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               name: nombre,
               email:correo,
               password:password,
               tel:telefono,
               preguntaSecreta:preguntaSecreta,
               respuesta:respuesta,
               imagen:img,
               rol:rol1,
             })
           })
           const data = await envia.json()
           console.log(data)
           showToast2()
           cambiarEstadoModal4(!estadoModal4);
          
         } catch (error) {
           console.error(error)
         }
       }   
       else{
         mensajePas()
       }
     }else{
       mensajeCorreo()
     }
   }


   const eliminar = async (id)=>{
         try{
           const envia =  await fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/users/'+id,{
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
           showToast3()
           cambiarEstadoModal5(!estadoModal5);
         } catch (error) {
           console.error(error)
         }
   }



    return (
      <>
        <div className="App">

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
                                <a class="nav-link" href="/Crud_Productos">Crud de Productos</a>
                            </li>
                         
                            <li class="nav-item">
                                <a class="nav-link" href="/">Cerrar Sesion</a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </nav>

          <h2>Lista de Usuarios</h2>
          <br />
        
          <ContenedorBotones>
            <Boton onClick={()=> cambiarEstadoModal3(!estadoModal3)}>Agregar</Boton>
          </ContenedorBotones>
          <br />
            <Table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Telefono</th>
                  <th>Pregunta Secreta</th>
                  <th>Respuesta</th>
                  <th>Imagen</th>
                  <th>Rol</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
              {users.map(item => (
                <tr>
                  <td>{(item._id)}</td>
                  <td>{(item.name)}</td>
                  <td>{(item.email)}</td>
                  <td>{(item.password)}</td>
                  <td>{(item.tel)}</td>
                  <td>{(item.preguntaSecreta)}</td>
                  <td>{(item.respuesta)}</td>
                  <td><img src={item.imagen} alt="Imagen del producto" style={{height:"150px", width:"180px"}} /></td>
                  <td>{item?.rol?.[0]?.rol}</td>
                  <td>
                    <button className="btn btn-primary" onClick={()=>getUserDetailsForEdit(item._id)}>Editar</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>getUserDetailsForEdit2(item._id)} >Eliminar</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
            
            
        
  {/*Modal del Login */}
              <Modal_Agregar_Usuario estado={estadoModal3} cambiarEstadoModal3={cambiarEstadoModal3}>
                <Contenido>
                {/*<div class="input-group" style={{height:"35px", margin:"10px"}}>
                  <span class="input-group-text" id="basic-addon1" style={{backgroundColor: "#EAFAF1", height:"35px"}}>@</span>
                  <Input type="text" style={{ margin:"0 10px"}} class="form-control" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="basic-addon1"/>
              </div>*/}
                    <Input type="text" id="nombre" onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" minlength="2" maxlength="20"
                        required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"/>
                    <Input type="email" id="email" onChange={(e) => setCorreo(e.target.value)} placeholder="Email" minlength="8" required spellcheck="true" 
                        pattern="^[a-zA-Z0-9]+"/>
                    <Input type="password"name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                        required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/>
                    <Input type="password"name="password2" onChange={(e) => setPassword2(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                        required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/>
                    <Input type="text" id="telefono" onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono" required spellcheck="true" minlength="1" maxlength="10"/>  
                    <select name="select" className="form-control" onChange={(e) => setSelectedValue(e.target.value)}>
                        <option value="Selecciona una pregunta">Selecciona una pregunta</option>
                        <option value="Como se Llama tu Mejor Amigo">Como se Llama tu Mejor Amigo</option>
                        <option value="Como se Llama tu Mamá">Como se Llama tu Mamá</option>
                        <option value="Quien es tu Artista Favorito">Quien es tu Artista Favorito</option>
                    </select>
                    <Input type="text"name="respuesta" onChange={(e) => setRespuesta(e.target.value)} placeholder="respuesta" minlength="2" maxlength="20" required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"
                        title="acepta solo letras"/> 
                      <select name="select" className="form-control" onChange={(e) => setRol(e.target.value)}>
                        <option value="Selecciona una pregunta">Selecciona una tipo de Usuario</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                    <Boton onClick={vacios}>Agregar</Boton>
                </Contenido>
            </Modal_Agregar_Usuario>

  {/*Modal del Login */}
<Modal_Editar_Usuario estado={estadoModal4} cambiarEstadoModal4={cambiarEstadoModal4}>
                <Contenido>
                <Input type="text" id="id" placeholder="Id" value={id} hidden />
                    <Input type="text" id="nombre"  value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" minlength="2" maxlength="20"
                        required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"/>
                    <Input type="email" id="email"  value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Email" minlength="8" required spellcheck="true" 
                        pattern="^[a-zA-Z0-9]+"/>
                    <Input type="password"name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                        required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/>
                    <Input type="password"name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                        required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/>
                    <Input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono" required spellcheck="true" minlength="1" maxlength="10"/>  
                    <select name="select" value={preguntaSecreta} className="form-control" onChange={(e) => setSelectedValue(e.target.value)} >
                        <option value="Como se Llama tu Mejor Amigo">Como se Llama tu Mejor Amigo</option>
                        <option value="Como se Llama tu Mamá">Como se Llama tu Mamá</option>
                        <option value="Quien es tu Artista Favorito">Quien es tu Artista Favorito</option>
                    </select>

                    <Input type="text"name="respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} placeholder="respuesta" minlength="2" maxlength="20" required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"
                        title="acepta solo letras"/> 
                     
                    <select name="select"value={rol} className="form-control" onChange={(e) => setRol(e.target.value)}>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                    <Boton onClick={()=>actu2(id)} >Actualizar</Boton>
                </Contenido>
            </Modal_Editar_Usuario>

  {/*Modal del Login */}
<Modal_Eliminar_Usuario estado={estadoModal5} cambiarEstadoModal5={cambiarEstadoModal5}>
<Contenido>
                <Input type="text" id="id" placeholder="Id" value={id} hidden />
                    <Input type="text" id="nombre"  value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" minlength="2" maxlength="20"
                        required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"/>
                    <Input type="email" id="email"  value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Email" minlength="8" required spellcheck="true" 
                        pattern="^[a-zA-Z0-9]+"/>
                    <Input type="password"name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                        required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/>
           
                    <Input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono" required spellcheck="true" minlength="1" maxlength="10"/>
                    <Input type="text"  value={preguntaSecreta} className="form-control" readonly/>    
             
                    <Input type="text"name="respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} placeholder="respuesta" minlength="2" maxlength="20" required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"
                        title="acepta solo letras"/> 
                     
                    <select name="select"value={rol} className="form-control" onChange={(e) => setRol(e.target.value)}>
                    <option value="Selecciona una pregunta">Selecciona una tipo de Usuario</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                    <Boton onClick={()=>eliminar(id)} >Confirmar</Boton>
                </Contenido>
            </Modal_Eliminar_Usuario>
        </div>
       </>
    )
  }

  
export default Copia_Crud_Usuarios
  
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
        color: #000;
        border:none;
        background: #fff;
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        transition: .3s ease all;
    
        &:hover {
            background: #0066FF;
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
   