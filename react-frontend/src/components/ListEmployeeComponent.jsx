import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.back= this.back.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    back(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div class="w-100">
                {/* <div class="p-3 mb-2 bg-dark"></div>  */}

                 <h2 className="text-center">Employees List</h2>
                 <div className = "row" >
                 {/* <div class="p-3 mb-2 bg-dark"></div>  */}
                    <button className="btn btn-primary" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <br></br>
                 <div className = "row">
                    
                        <table className = "table table-bordered table-dark">

                            <thead>
                                <tr>
                                    <th> Avatar</th>
                                    <th> First Name</th>
                                    <th> Last Name</th>
                                    <th> Email Address</th>
                                    <th> Temperature</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> <img src={`http://localhost:8084/api/v1/user-photos/${employee.id}/${employee.title}`} class="rounded float-left" alt="pic1" style={{ paddingLeft: 10, maxWidth: 150 }} /> </td>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td> {employee.temp}</td>
                                             <td>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.editEmployee(employee.id)} className="btn btn-success">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                 <div className = "row">
                    <button className="btn btn-danger" onClick={this.back} style={{marginLeft: "1080px"}}>Back</button>
                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
