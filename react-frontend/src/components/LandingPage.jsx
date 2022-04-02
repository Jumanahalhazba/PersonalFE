import React, { Component, useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { AddTempModal } from "./AddTempModal";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import backgroundimg from "../../src/components/background.jpeg";
import "../App.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      show: false,
      selectedEmp: null,
      currentDateTime: Date().toLocaleString(),
    };

    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.back = this.back.bind(this);

    this.openModal = this.openModal.bind(this);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  }
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  addEmployee() {
    this.props.history.push("/add-employee/_add");
  }

  back() {
    this.props.history.push("/");
  }
  openModal(empId) {
    console.log(empId);
    this.setState({
      show: !this.state.show,
      selectedEmp: empId,
    });
  }

  render() {
    return (
      <div className="container">
        <br></br>
        <h2 className="text-center">Select Yourself</h2>
        <br></br>
        <div className="row">
          {this.state.employees.map((employee) => (
            <div>
              {/* <div class="bg-image" style={{ background: backgroundimg}}></div>*/}
              {/* <div class="p-3 mb-2 bg-dark text-white"></div>  */}
              <img
                key={employee.id}
                onClick={() => this.openModal(employee.id)}
                src={`http://localhost:8084/api/v1/user-photos/${employee.id}/${employee.title}`}
                class="card border-warning rounded float-left dashboard-card"
                alt="pic1"
                style={{ marginBottom: 10, marginLeft: 10, maxWidth: 200 }}
              ></img>
            </div>
          ))}
        </div>

        <AddTempModal
          show={this.state.show}
          date={this.state.currentDateTime}
          id={this.state.selectedEmp}
        />
        {/* <AddTempModal show={this.state.show} message={this.state.selectedEmp}/> */}
      </div>
    );
  }
}

export default LandingPage;
