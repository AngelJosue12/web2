import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Form } from 'react-bootstrap';


const Modal_Editar_Usuario2 = ({show, handleClose2}) =>{
  

  return (

      <Modal show={show} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" placeholder="Nombre" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="text" placeholder="$" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="text" placeholder="Imagen" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control as="textarea" rows={1} />
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Existencia</Form.Label>
              <Form.Control type="text" placeholder="#" autoFocus/>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Categoria</Form.Label>
              <Form.Control type="text" placeholder="Categoria" autoFocus/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose2}>Cancelar</Button>
          <Button variant="success" onClick={handleClose2}>Registrar</Button>
        </Modal.Footer>
      </Modal>
    
  )
}

export default Modal_Editar_Usuario2