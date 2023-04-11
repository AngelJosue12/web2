import React, { useState } from "react"
import styled from 'styled-components'

class Crud_Usuarios_ejemplo extends React.Component {
    state={
      modalAgregar: false,
      modalEditar: false,
      modalEliminar: false,
    }
  
    abrirModalAgregar=()=>{
      this.setState({modalAgregar: !this.state.modalAgregar});
    }
  
    abrirModalEditar=()=>{
      this.setState({modalEditar: !this.state.modalEditar});
    }
    
    abrirModalEliminar=()=>{
      this.setState({modalEliminar: !this.state.modalEliminar});
    }
  
    render(){
      const modalStyles={
        position: "absolute",
        width: '30%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
      return (
        <>
          <div className="App">
            <h2>Lista de Usuarios</h2>
          <br />
          <Container>
            <div>
              <button className="btn btn-success" onClick={this.abrirModalAgregar}>Agregar Nuevo Usuario</button>
            </div>
            <br />
              <Table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Telefono</th>
                    <th>Respuesta</th>
                    <th>Imagen</th>
                    <th>Rol</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>Id</td>
                      <td>Nombre</td>
                      <td>Email</td>
                      <td>Password</td>
                      <td>Telefono</td>
                      <td>Respuesta</td>
                      <td>Imagen</td>
                      <td>Rol</td>
                      <td><button className="btn btn-primary"onClick={this.abrirModalEditar}>Editar</button>
                      <button className="btn btn-danger" onClick={this.abrirModalEliminar}>Eliminar</button></td>
                    </tr>
                </tbody>
              </Table>
          </Container>
          
  {/*----------------------------------------MODAL AGREGAR USUARIO---------------------------------------*/}
            <Modal isOpen={this.state.modalAgregar} style={modalStyles}>
              <ModalHeader>Agregar Usuario</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Input type="text" id="nombre" onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" minlength="2" maxlength="20"
                          required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="email" id="email" onChange={(e) => setCorreo(e.target.value)} placeholder="Email" minlength="8" required spellcheck="true" 
                          pattern="^[a-zA-Z0-9]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                          required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="password" id="password2" onChange={(e) => setPassword2(e.target.value)} placeholder="Password" minlength="6" maxlength="10" 
                          required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="telefono" onChange={(e) => setTelefono(e.target.value)} placeholder="Telefono" required spellcheck="true" minlength="1" maxlength="10"/> 
                </FormGroup>
                <FormGroup>
                  <select name="select" className="form-control" onChange={(e) => setSelectedValue(e.target.value)} >
                    <option value="Selecciona una pregunta">Selecciona una pregunta</option>
                    <option value="Como se Llama tu Mejor Amigo">Como se Llama tu Mejor Amigo</option>
                    <option value="Como se Llama tu Mamá">Como se Llama tu Mamá</option>
                    <option value="Quien es tu Artista Favorito">Quien es tu Artista Favorito</option>
                  </select> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="respuesta" onChange={(e) => setRespuesta(e.target.value)} placeholder="Respuesta" minlength="2" maxlength="20" required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"
                    title="acepta solo letras"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="rol" placeholder="Rol"/> 
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={this.vacios}>Agregar</Button>
                  <Button color="secondary" onClick={this.abrirModalAgregar}>Cerrar</Button>
              </ModalFooter>
            </Modal>
  
  {/*------------------------------------------MODAL EDITAR USUARIOS------------------------------------------*/}
            <Modal isOpen={this.state.modalEditar} style={modalStyles}>
              <ModalHeader>Editar Usuario</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Input type="text" id="id" placeholder="Id"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="nombre" placeholder="Nombre" minlength="2" maxlength="20"
                          required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="email" id="email" placeholder="Email" minlength="8" required spellcheck="true" 
                          pattern="^[a-zA-Z0-9]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="password" id="password" placeholder="Password" minlength="6" maxlength="10" 
                          required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="telefono" placeholder="Telefono" required spellcheck="true" minlength="1" maxlength="10"/> 
                </FormGroup>
                <FormGroup>
                  <select name="select" className="form-control" >
                    <option value="Selecciona una pregunta">Selecciona una pregunta</option>
                    <option value="Como se Llama tu Mejor Amigo">Como se Llama tu Mejor Amigo</option>
                    <option value="Como se Llama tu Mamá">Como se Llama tu Mamá</option>
                    <option value="Quien es tu Artista Favorito">Quien es tu Artista Favorito</option>
                  </select> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="respuesta" placeholder="Respuesta" minlength="2" maxlength="20" required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"
                    title="acepta solo letras"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="rol" placeholder="Rol"/> 
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={this.abrirModalEditar}>Actualizar</Button>
                  <Button color="secondary" onClick={this.abrirModalEditar}>Cerrar</Button>
              </ModalFooter>
            </Modal>
  
  {/*----------------------------------------MODAL ELIMINAR USUARIO----------------------------------------*/}
            <Modal isOpen={this.state.modalEliminar} style={modalStyles}>
              <ModalHeader>Eliminar Usuario</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Input type="text" id="id" placeholder="Id"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="nombre" placeholder="Nombre" minlength="2" maxlength="20"
                          required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="email" id="email" placeholder="Email" minlength="8" required spellcheck="true" 
                          pattern="^[a-zA-Z0-9]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="password" id="password" placeholder="Password" minlength="6" maxlength="10" 
                          required spellcheck="true" pattern="[A-Z|a-z|0-9]+"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="telefono" placeholder="Telefono" required spellcheck="true" minlength="1" maxlength="10"/> 
                </FormGroup>
                <FormGroup>
                  <select name="select" className="form-control" >
                    <option value="Selecciona una pregunta">Selecciona una pregunta</option>
                    <option value="Como se Llama tu Mejor Amigo">Como se Llama tu Mejor Amigo</option>
                    <option value="Como se Llama tu Mamá">Como se Llama tu Mamá</option>
                    <option value="Quien es tu Artista Favorito">Quien es tu Artista Favorito</option>
                  </select> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="respuesta" placeholder="Respuesta" minlength="2" maxlength="20" required spellcheck="true" pattern="[A-Z|a-z| |áéíóú|ÁÉÍÓÚ|Ñ|ñ]+"
                    title="acepta solo letras"/> 
                </FormGroup>
                <FormGroup>
                  <Input type="text" id="rol" placeholder="Rol"/> 
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={this.abrirModalEliminar}>Eliminar</Button>
                  <Button color="secondary" onClick={this.abrirModalEliminar}>Cerrar</Button>
              </ModalFooter>
            </Modal>
          </div>
        </>
      )
    }
  }
    
  export default Crud_Usuarios_ejemplo
    