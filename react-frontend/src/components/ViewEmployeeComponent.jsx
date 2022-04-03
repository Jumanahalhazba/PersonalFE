import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }

  back() {
    this.props.history.push("/employees");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container card-container">
          <h3 className="text-center"> View Employee Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Employee First Name: </label>
              <label> &nbsp;{this.state.employee.firstName}</label>
            </div>
            <div className="row">
              <label> Employee Last Name: </label>
              <label> &nbsp;{this.state.employee.lastName}</label>
            </div>
            <div className="row">
              <label> Employee Email ID: </label>
              <label> &nbsp;{this.state.employee.emailId}</label>
            </div>
            <div className="row">
              <label> Employee Temp: </label>
              <label> &nbsp;{this.state.employee.temp}</label>
            </div>
            <div className="row">
              <label> Employee Title: </label>
              &nbsp;
              <img
                src={`http://localhost:8084/api/v1/user-photos/${this.state.id}/${this.state.employee.title}`}
                className="rounded img-card"
                alt="image"
              />
            </div>
            <button onClick={this.back} className="btn btn-danger float-right">
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployeeComponent;
