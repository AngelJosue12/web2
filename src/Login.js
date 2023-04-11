import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,Label,Input} from "reactstrap"
import "bootstrap/dist/css/bootstrap.css"

class Login extends React.Component{
    state={
        modalAgregar: false,
      }
    
      abrirModalAgregar=()=>{
        this.setState({modalAgregar: !this.state.modalAgregar});
      }

    render(){
        const modalStyles={
            position: "absolute",
            width: '30%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }

        return(
            <>
                <Modal isOpen={this.state.modalAgregar} style={modalStyles}>
                    <ModalHeader>Agregar Usuario</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            {/*<Label for="nombre" className="mb-1">Nombre</Label>*/}
                            <Input type="text" id="nombre" placeholder="Nombre"/> 
                        </FormGroup>
                        <FormGroup>
                            {/*<Label for="email" className="mb-1">Email</Label>*/}
                            <Input type="email" id="email" placeholder="Email"/> 
                        </FormGroup>
                        <FormGroup>
                            {/*<Label for="password" className="mb-1">Password</Label>*/}
                            <Input type="password" id="password" placeholder="Password"/> 
                        </FormGroup>
                        <FormGroup>
                            {/*<Label for="telefono" className="mb-1">Telefono</Label>*/}
                            <Input type="text" id="telefono" placeholder="Telefono"/> 
                        </FormGroup>
                        <FormGroup>
                            {/*<Label for="respuesta" className="mb-1">Respuesta</Label>*/}
                            <Input type="text" id="respuesta" placeholder="Respuesta"/> 
                        </FormGroup>
                        <FormGroup>
                            {/*<Label for="imagen" className="mb-1">Imagen</Label>*/}
                            <Input type="text" id="imagen" placeholder="Imagen"/> 
                        </FormGroup>
                        <FormGroup>
                            {/*<Label for="rol" className="mb-1">Rol</Label>*/}
                            <Input type="text" id="rol" placeholder="Rol"/> 
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.abrirModalAgregar}>Agregar</Button>
                        <Button color="secondary" onClick={this.abrirModalAgregar}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default Login