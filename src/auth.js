import React,{useState,createContext} from 'react'
export const authContext=createContext()
export default function auth() {
    

     const [user,setUser]=useState(bull)

     
        const login =(Nombre,Email, UserName,Telefono, Password, id,rol, respuesta, pregunta, imagen)=> {
            ;
            setUser({
                id:id,
                Nombre:Nombre, 
                password:Password, 
                email:Email,
                role:rol,
                telefono:Telefono,
                respuesta:respuesta,
                pregunta: pregunta,
                imagen:imagen,
            });
            
        }
     
  return (
    <div>auth</div>
  )
}
