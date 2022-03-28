import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddTempModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: this.props.show,
    }
    this.handleClose = () => this.setState({ show: false });
    this.handleShow = () => this.setState({ show: true });

  }

  componentWillReceiveProps(props) {
    this.setState({ show: props.show })
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  }
}