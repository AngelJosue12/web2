import React, { Component } from 'react';
import styled from 'styled-components'
class Iot extends Component{
    render(){
    return(
        
        <div className="iframe-container">
             <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#EAFAF1"}}>
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
                        
                        </ul>
                       
                    </div>
                </div>
            </nav>
            <iframe
          src="https://pagina.yogurtyadsaar.com/proyecto/index.html"
          width="2000px" height="1000px" allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" className='w-100 p-2' scrolling="no"></iframe>
        </div>
    )      
  }
}

export default Iot;



const Des= styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0px 220px;
`;

const Texto= styled.div`
    display: flex;
    justify-content: flex-end;
    margin:0px 200px;
`;

const Cuerpo = styled.div`
    width: 100%;
    height: 589px;
    background: #EAFAF1;
    background-image: url(/background/fondo4.jpg);
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

const PiePagina =styled.div`
    width: 100%;
    height: 100px;
    background: #141514;

    img{
        margin:10px;
    }
    h4{
        color:#fff;
    }
    a{
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
 
