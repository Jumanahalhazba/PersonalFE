import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.back = this.back.bind(this);
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
      console.log(res.data);
      this.setState({ employees: res.data });
    });
  }

  addEmployee() {
    this.props.history.push("/add-employee/_add");
  }

  back() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container">
        {/* <div class="p-3 mb-2 bg-dark"></div>  */}

        <h2 className="row center">Employees List</h2>
        <div className="row">
          {/* <div class="p-3 mb-2 bg-dark"></div>  */}
          <button className="btn-outlined" onClick={this.addEmployee}>
            <span className="text-as-icon">+</span>
            <span>Add Employee</span>
          </button>
        </div>
        <br></br>
        <div className="row center">
          <table className="custom-table">
            <thead className="table-header">
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
              {this.state.employees.map((employee, i) => (
                <tr
                  key={employee.id}
                  className={"table-row " + (i % 2 ? "dark" : "light")}
                >
                  <td>
                    {" "}
                    <img
                      src={`http://localhost:8084/api/v1/user-photos/${employee.id}/${employee.title}`}
                      alt="avater"
                      className="table-row-avatar"
                    />{" "}
                  </td>
                  <td> {employee.firstName} </td>
                  <td> {employee.lastName}</td>
                  <td> {employee.emailId}</td>
                  <td> {employee.temp}</td>
                  <td>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-success"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row right top-margin-50">
          <button className="btn btn-danger wide-btn" onClick={this.back}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
