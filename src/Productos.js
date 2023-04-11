
import styled from 'styled-components'
import React,{ useState,useEffect } from "react"


function Productos() {


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

    return (
        <div>
            <nav class="navbar navbar-expand-lg" style={{backgroundColor: "#EAFAF1"}}>
                <div class="container-fluid">
                    <img src="/img/logo3.png" alt="Bootstrap" width="50" height="50"></img>
                    <a class="navbar-brand" href="#">Eco-P</a>
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
                    </div>
                </div>
            </nav>
            <Cuerpo>

            <div class="row row-cols-1 row-cols-md-4 g-3 mt-0 m-5">
            {productos.map(producto => (
                <div class="col">
                    <div class="card h-100">
                    <img src={producto.Imagen} class="card-img-top" alt="..."></img>
                    <div class="card-body">
                        
                    <p class="card-text">{(producto?.categoria?.[0]?.name)}</p>
                        <h5 class="card-title">{(producto.nombre)}</h5>
                        <p class="card-text">{(producto.Descripcion)}</p>
                        <p class="card-text">Precio: {(producto.precio)}</p>
                        <p class="card-text">Existencias: {(producto.Existencias)}</p>
                        <a href="#" class="btn btn-success" style={{backgroundColor: "#008000", border:"none"}}>Añadir al carrito</a>
                    </div>
                    
                    </div>
                </div>
                ))}
            </div>
            </Cuerpo>
            {/* contenedor de las card*/}
            
        </div>
        

        
    )
  }
  
  export default Productos

  const Cuerpo = styled.div`
    width: 100%;
    height: 589px;
    background: #EAFAF1;
    
    background-position: center center;
    background-size: cover;

    h1{
        text-align: right;
        margin:0px 350px;
    }
    P{
        
        color:#000;
    }

`;