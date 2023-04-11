import React, { useState } from "react"
import styled from 'styled-components'
import Modal_Login from './Modal_Login'
import {Alert, Input} from "reactstrap"
import Modal_Registro from "./modales/Modal_Registro"
import { useNavigate } from "react-router-dom"
import validator from "validator"
import Iot from "./IOT"

const Inicio =() => {

    const vacios=()=>{
        if(nombre=='' || correo==''||password==''||password2==''||telefono==''||respuesta==''|selectedValue==''){
            alert('Rellene Los Campos');
        }
        else{
          verficarSiExiste();
        }
      }
      const [selectedValue, setSelectedValue] = useState("");
      const [nombre, setNombre] = useState("");
      const [correo, setCorreo] = useState("");
      const [password, setPassword] = useState( "");
      const [password2, setPassword2] = useState("");
      const [telefono, setTelefono] = useState("");
      const [respuesta, setRespuesta] = useState("");

      const [passwordStrength, setPasswordStrength] = useState({
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isLengthValid: false,
      });
      
      
      const handlePasswordChange = (event) => {

     

        const newPassword = event.target.value;
      
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasNumber = /\d/.test(newPassword);
        const hasSpecialChar = /[@$!%*?&]/.test(newPassword);
        const isLengthValid = newPassword.length >= 8;
      
        setPasswordStrength({
          hasLowerCase,
          hasUpperCase,
          hasNumber,
          hasSpecialChar,
          isLengthValid,
        });
      
        setPassword(newPassword);
      };
      

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
               cambiarEstadoModal2(!estadoModal2);
               nav('/')
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
    
    //-----------------------------------------------------

    const CamposVacios =()=>{
        alert('Rellena los campos ');
    };

    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [pas, setPas] = useState('');

    const verficarDatos = async () => {
        if( email==''|| pas==''){
           CamposVacios();
        }else{
        try {
            const envia = await fetch('https://ecop-ah5318740-gmailcom.vercel.app/api/users/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: pas
                })
            });
            const data = await envia.json();
            if (data.message === 'Correo o contraseña incorrectas,verifique') {
                alert('Esta cuenta No existe Registrese Porfavor')
                cambiarEstadoModal2(!estadoModal2);
                cambiarEstadoModal1(!estadoModal1);
                nav('/');
                /////////// login
            
            } else if(data.rol=='641cf98605338c1dfd56a111') {
                
                nav('/Crud_Usuarios');
  
            }else{
                nav('/Productos');
            }
           
        } catch (error) {
            console.error(error);
        }
    }
    };
      
    const [estadoModal1, cambiarEstadoModal1] = useState(false);
    const [estadoModal2, cambiarEstadoModal2] = useState(false);



    const [isValid, setIsValid] = useState(false);

    const validatePhone = (value) => {
      // Validar si el valor es un número
      if (isNaN(value)) {
        return false;
      }
  
      // Validar si el número tiene exactamente 10 caracteres
      if (value.length !== 10) {
        return false;
      }
  
      // Si el valor es un número y tiene 10 caracteres, es válido
      return true;
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setTelefono(value);
        setIsValid(validatePhone(value));
      };
    
    return (
        <div>
            
            

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
                                <a class="nav-link active" aria-current="page" href="/">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Productos">Productos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/Iot">IOT</a>
                            </li>
                        </ul>
                        <ContenedorBotones>
                            <Boton onClick={()=> cambiarEstadoModal1(!estadoModal1)}>Iniciar Sesion</Boton>
                        </ContenedorBotones>
                        <ContenedorBotones>
                            <Boton onClick={()=> cambiarEstadoModal2(!estadoModal2)}>Registrate</Boton>
                        </ContenedorBotones>
                    </div>
                </div>
            </nav>
            <Presentacion> 
                <h1>Lulë</h1>
                <p>Sientete segura comprando productos ecologicos, <br></br> Sientete sefura contigo misma.</p>
            </Presentacion>
            <Cuerpo>
                <h1>Desodorantes mas Vendidos</h1>
                <div class="row row-cols-1 row-cols-md-5 g-3 mt-0 m-5">
                    <div class="col">
                        <div class="card h-90 w-55">
                            <div margin="0px 20px"><img src="/img/3.jpg" alt="..." width="160" height="140"></img></div>
                            <div class="card-body" style={{backgroundColor: "#EAFAF1"}}>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Precio: $50</p>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Existencia: 5</p>
                                <a href="#" class="btn btn-success" style={{backgroundColor: "#008000", border:"none"}}>Añadir al carrito</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-90 w-55">
                            <div margin="0px 20px"><img src="/img/3.jpg" alt="..." width="160" height="140"></img></div>
                            <div class="card-body" style={{backgroundColor: "#EAFAF1"}}>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Precio: $50</p>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Existencia: 5</p>
                                <a href="#" class="btn btn-success" style={{backgroundColor: "#008000", border:"none"}}>Añadir al carrito</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-90 w-55">
                            <div margin="0px 20px"><img src="/img/3.jpg" alt="..." width="160" height="140"></img></div>
                            <div class="card-body" style={{backgroundColor: "#EAFAF1"}}>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Precio: $50</p>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Existencia: 5</p>
                                <a href="#" class="btn btn-success" style={{backgroundColor: "#008000", border:"none"}}>Añadir al carrito</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-90 w-55">
                            <div margin="0px 20px"><img src="/img/3.jpg" alt="..." width="160" height="140"></img></div>
                            <div class="card-body" style={{backgroundColor: "#EAFAF1"}}>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Precio: $50</p>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Existencia: 5</p>
                                <a href="#" class="btn btn-success" style={{backgroundColor: "#008000", border:"none"}}>Añadir al carrito</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-90 w-55">
                            <div margin="0px 20px"><img src="/img/3.jpg" alt="..." width="160" height="140"></img></div>
                            <div class="card-body" style={{backgroundColor: "#EAFAF1"}}>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Precio: $50</p>
                                <p class="card-text" style={{color: "#000",fontSize: "17px"}}>Existencia: 5</p>
                                <a href="#" class="btn btn-success" style={{backgroundColor: "#008000", border:"none"}}>Añadir al carrito</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Cuerpo>
{/*------------------------------------------------PIE DE PAGINA-------------------------------------------*/}            
            {/*Modal del Login */}
            <Modal_Login estado={estadoModal1} cambiarEstadoModal1={cambiarEstadoModal1}>
                <Contenido>
                    <Input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                    <Input type="password" id="password" placeholder="passward" onChange={(e) => setPas(e.target.value)} required/>    
                    <Boton onClick={verficarDatos}>Iniciar</Boton>
                </Contenido>
            </Modal_Login>

            {/*Modal del Registro */}
            <Modal_Registro estado={estadoModal2} cambiarEstadoModal1={cambiarEstadoModal2}>
                <Contenido>
                    <Input type="text" id="nombre" onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" minlength="2" maxlength="20"
                        required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"/>
                    <Input type="email" id="email" onChange={(e) => setCorreo(e.target.value)} placeholder="Email" minlength="8" required spellcheck="true" 
                        pattern="^[a-zA-Z0-9]+"/>


                    <Input type="password"name="password" onChange={(e) => setPassword(e.target.value),handlePasswordChange} placeholder="Password" minlength="6" maxlength="10" 
                        required spellcheck="true" />
        

        <div>
        
         {passwordStrength.isLengthValid ? (
          <span style={{ color: 'green' }}></span> 
        ) : (
          <span style={{ color: 'red' }}>La contraseña debe tener al menos 8 caracteres.</span>
        )}
        {passwordStrength.hasLowerCase ? (
          <span style={{ color: 'green' }}></span>
        ) : (
          <span style={{ color: 'red' }}>La contraseña debe tener una letra minúscula.</span>
        )}
        {passwordStrength.hasUpperCase ? (
          <span style={{ color: 'green' }}></span>
        ) : (
          <span style={{ color: 'red' }}>La contraseña debe tener una letra mayúscula.</span>
        )}
        {passwordStrength.hasNumber ? (
          <span style={{ color: 'green' }}></span>
        ) : (
          <span style={{ color: 'red' }}>La contraseña debe tener un número.</span>
        )}
        {passwordStrength.hasSpecialChar ? (
          <span style={{ color: 'green' }}></span>
        ) : (
          <span style={{ color: 'red' }}>La contraseña debe tener un carácter especial.</span>
        )}
      </div>



                    <Input type="password"name="password2" onChange={(e) => setPassword2(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                        required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/>
                    <Input type="text" id="telefono" onChange={(e) => setTelefono(e.target.value),handleChange} placeholder="Telefono" required spellcheck="true" minlength="1" maxlength="10"/>  
                    {telefono.length > 0 && !isValid && (
                    <p>El número de teléfono debe tener exactamente 10 dígitos.</p>
                    )}
                    <select name="select" className="form-control" onChange={(e) => setSelectedValue(e.target.value)}>
                        <option value="Selecciona una pregunta">Selecciona una pregunta</option>
                        <option value="Como se Llama tu Mejor Amigo">Como se Llama tu Mejor Amigo</option>
                        <option value="Como se Llama tu Mamá">Como se Llama tu Mamá</option>
                        <option value="Quien es tu Artista Favorito">Quien es tu Artista Favorito</option>
                    </select>
                    <Input type="text"name="respuesta" onChange={(e) => setRespuesta(e.target.value)} placeholder="respuesta" minlength="2" maxlength="20" required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"
                        title="acepta solo letras"/> 
                    {/*<Input id="imagen"  className="input-file"type="file"name="imagen" required spellCheck ="true" placeholder= "imagen"/>*/}
                    <Boton onClick={vacios}>Registrar</Boton>
                </Contenido>
            </Modal_Registro>
            <PiePagina>
                <div style={{marginRight: "200px"}}>
                    <div><h4>Mas Informacion</h4></div>
                    <div><a class="navbar-brand" href="">Preguntas Frecuentes</a></div>
                    <div><a class="navbar-brand" href="">Terminos y Condiciones</a></div>
                    <div><a class="navbar-brand" href="">Aviso de Privacidad</a></div>
                    <div><a class="navbar-brand" href="">Facturacion</a></div>
                    <div><a class="navbar-brand" href="">Politica de Reembolso</a></div>
                </div>
                <br></br>
                
                <div>
                    <div><h4>Contactanos</h4></div>
                    <div><p>¿Tienes alguna duda?</p></div>
                    <div><p>Manda un correo a <br></br>Ecop@gmail.com <br></br>Estamos para ayudarte</p></div>
                </div>
                <div style={{marginLeft: "100px"}}>
                    <h4>Siguenos</h4>
                    <img src="/img/facebook.png" alt="facebook" width="25" height="25"/> 
                    <a class="navbar-brand " href="https://web.facebook.com/profile.php?id=100090924356546&is_tour_dismissed=true">facebook.com</a>
               
                    <img src="/img/instagram.png" alt="instagram" width="25" height="25"/>
                    <a class="navbar-brand " href="https://www.instagram.com/eco_p_oficial/">Instagram.com</a>
                
                    <img src="/img/twitter.png" alt="twitter" width="25" height="25"/>
                    <a class="navbar-brand " href="https://twitter.com/Pedro10529383">Twitter.com</a>
                </div>
            </PiePagina>
        </div>
    );

}

export default Inicio



const Cuerpo = styled.div`
    width: 100%;
    height: 369px;

    h1{
        font-size: 30px;
    }
    P{
        font-size: 20px;
        color:#fff;
    }

`;

const Presentacion = styled.div`
    width: 100%;
    height: 220px;
    background: #EAFAF1;
    background-image: url(/background/fondo5.jpg);
    background-position: center center;
    background-size: cover;

    h1{
        
        color: #fff;
        font-size: 100px;
    }
    P{
        font-size: 20px;
        color:#fff;
    }

`;

const PiePagina =styled.div`
    width: 100%;
    height: 165px;
    background: #141514;
    display: flex;
    justify-content: center;
    img{
        margin:10px;
    }
    h4{
        color:#fff;
    }
    a{
        color:#fff;
    }
    p{
        color:#fff;
    }
    
`;

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
 
