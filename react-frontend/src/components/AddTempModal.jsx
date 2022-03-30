import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import EmployeeService from '../services/EmployeeService';
import moment from 'moment'

export class AddTempModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: this.props.show,
      temp: '',
      id: this.props.id,
      date:this.props.date
    }
    this.handleClose = () => this.setState({ show: false });
    this.handleShow = () => this.setState({ show: true });

  }

  componentWillReceiveProps(props) {
    this.setState({ show: props.show, id: props.id, date:props.date })
  }

  updateEmployee = (e) => {
    e.preventDefault();
    console.log(this.state.id)
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      let employee = res.data;

      employee.temp = this.state.temp;

      console.log('employee => ' + JSON.stringify(employee));
      console.log('id => ' + JSON.stringify(this.state.id));
      EmployeeService.updateEmployee(employee, this.state.id).then(res => {
        this.setState({show:false})
      });
    });
  }
  //   saveOrUpdateEmployee = (e) => {
  //     e.preventDefault();
  //     let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,  title: this.state.title.name, temp: this.state.temp};
  //     console.log('employee => ' + JSON.stringify(employee));

  //     // step 5
  //     if(this.state.id === '_popup'){
  //         EmployeeService.createEmployee(employee, this.state.title, this.state.temp).then(res =>{
  //             this.props.history.push('/employees');
  //         });
  //     }else{
  //         EmployeeService.updateEmployee(employee, this.state.id).then( res => {
  //             this.props.history.push('/employees');
  //         });
  //     }
  // }


  changeTempHandler = (event) => {
    this.setState({ temp: event.target.value });
  }


  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Temperature</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            {moment(this.state.date).format('lll')}
            {/* <input placeholder="Enter your temperature here" keyboardType="numeric" /> */}

            <div className="form-group">
              <input placeholder="temp" name="temp" className="form-control"
                value={this.state.temp} onChange={this.changeTempHandler} />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button> */}
            <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
          </Modal.Footer>
        </Modal>
      </>
    );

  }
}