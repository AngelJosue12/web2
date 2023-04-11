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
    if(nombre=='' || correo==''||password==''||password2==''||telefono==''||respuesta==''||selectedValue==''){
        alert('Rellene Los Campos');
    }
    else{
      verficarSiExiste();
    }
  }


  const [users, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [telefono, setTelefono] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const [id, setId] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [correo2, setCorreo2] = useState("");
  const [password21, setPassword21] = useState("");
  const [password22, setPassword22] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [respuesta2, setRespuesta2] = useState("");

  
  
  useEffect(() => {
    fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/usersR')
      .then(response => response.json())
      .then(data => setUsers(data));
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

    function Actualizar(id) {
    fetch(`https://node-vercel-ahor.vercel.app/api/users/${id}`)
      .then(response => response.json())
      .then(data => {
        setId(data._id);
        setNombre2(data.name);
        setCorreo2(data.email);
        setPassword(data.password);
        setTelefono(data.tel);
        setRespuesta(data.respuesta);
      
      });

  const insertUsuario = async ()=>{
    
    if(validarCorreo(correo)){
       if(passwordIgua(password,password2)){
        vacios();
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
               preguntaSecreta:selectedValue,
               respuesta:respuesta,
               imagen:('https://res.cloudinary.com/dfkijykja/image/upload/v1679958790/imagenes/usuario_rsq7sz.png'),
               rol:('641d06c9bb476876fc4c23ad')
             })
           })
           const data = await envia.json()
           console.log(data)
           showToast()
           nav('/Crud_Usuarios');
          
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
  
  const [estadoModal3, cambiarEstadoModal3] = useState(false);
  const [estadoModal4, cambiarEstadoModal4] = useState(false);
  const [estadoModal5, cambiarEstadoModal5] = useState(false);

    return (
      <>
        <div className="App">
          <h2>Lista de Usuarios</h2>
        <br />
        <Container>
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
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
              {users.map(item => (
                <tr>
                  <td>{(item._id)}</td>
                  <td>{item.nombre}</td>
                  <td>{item.email}</td>
                  <td>{(item.password)}</td>
                  <td>{item.telefono}</td>
                  <td>{item.preguntaSecreta}</td>
                  <td>{item.respuesta}</td>
                  <td><img src={item.imagen} alt="Imagen del producto" /></td>
                  <td></td>
                  <td><button className="btn btn-primary" onClick={()=> cambiarEstadoModal4(!estadoModal4)}>Editar</button>
                <button className="btn btn-danger" >Eliminar</button></td>
                </tr>
              ))}
              </tbody>
            </Table>
        </Container>
        
  {/*Modal del Login */}
              <Modal_Agregar_Usuario estado={estadoModal3} cambiarEstadoModal3={cambiarEstadoModal3}>
                <Contenido>
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
                    
                    <Boton onClick={vacios}>Agregar</Boton>
                </Contenido>
            </Modal_Agregar_Usuario>

  {/*Modal del Login */}
<Modal_Editar_Usuario estado={estadoModal4} cambiarEstadoModal4={cambiarEstadoModal4}>
                <Contenido>
                <Input type="text" id="id" placeholder="Id"/>
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
                    <Input type="text" id="rol" placeholder="Rol"/>
                    
                    <Boton onClick={}>Actualizar</Boton>
                </Contenido>
            </Modal_Editar_Usuario>

  {/*Modal del Login */}
<Modal_Eliminar_Usuario estado={estadoModal5} cambiarEstadoModal5={cambiarEstadoModal5}>
                <Contenido>
                <Input type="text" id="id" placeholder="Id"/>
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
                    <Input type="text" id="rol" placeholder="Rol"/>
                    <Boton onClick={vacios}>Actualizar</Boton>
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