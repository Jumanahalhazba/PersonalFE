import React, { Component } from 'react';
import {Modal,Button,Row, Col,Form} from 'react-bootstrap'; 

export class AddTempModal extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Temperature
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button variant = "danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
            
        );

    }
}