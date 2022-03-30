import React, { Component, useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService'
import { AddTempModal } from './AddTempModal'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            show: false,
            selectedEmp: null,
            currentDateTime: Date().toLocaleString()
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.back = this.back.bind(this);

        this.openModal = this.openModal.bind(this);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
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
        this.props.history.push('/add-employee/_add');
    }

    back() {
        this.props.history.push('/');
    }
    openModal(empId) {
        this.setState({
            show: !this.state.show,
            selectedEmp: empId,
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">SELECT Yourself</h2>
                <br></br>
                <div className="row">
                    {
                        this.state.employees.map(
                            employee =>
                                <img key={employee.id} onClick={() => this.openModal(employee.id)} src={`http://localhost:8084/api/v1/user-photos/${employee.id}/${employee.title}`} class="rounded float-left" alt="pic1" style={{ paddingLeft: 10, maxWidth: 150 }}></img>
                        )
                    }
                </div>

                <AddTempModal show={this.state.show} message={this.state.currentDateTime}/>
                {/* <AddTempModal show={this.state.show} message={this.state.selectedEmp}/> */}
            </div>
        )
    }
}

export default LandingPage
