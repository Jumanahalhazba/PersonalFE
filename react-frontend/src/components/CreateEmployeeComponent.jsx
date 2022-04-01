import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            title: '',
            temp: '',
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId,
                    title: employee.title,
                    temp: employee.temp
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        // step 5
        if (this.state.id === '_add') {
            let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, title: this.state.title.name, temp: this.state.temp };
            console.log('employee => ' + JSON.stringify(employee));

            EmployeeService.createEmployee(employee, this.state.title).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            if (this.state.title.name != null) {
                let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, title: this.state.title.name, temp: this.state.temp };
                console.log('employee => ' + JSON.stringify(employee));

                EmployeeService.updateEmployee(employee, this.state.id, this.state.title).then(res => {
                    this.props.history.push('/employees');
                });
            }else{
                let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, title: this.state.title, temp: this.state.temp };
                console.log('employee => ' + JSON.stringify(employee));

                EmployeeService.updateEmployee(employee, this.state.id, null).then(res => {
                    this.props.history.push('/employees');
                });
            }
        }
    }

    printData = () => {
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, title: this.state.title, temp: this.state.temp };
        console.log('employee', employee
        )
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }
    changeImageHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({ title: event.target.files[0] });
        //this.setState({title: event.target.value});
    }

    changeTempHandler = (event) => {
        this.setState({ temp: event.target.value });
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <button onClick={this.printData}>Click MEEEE</button>
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Temp: </label>
                                        <input placeholder="temp" name="temp" className="form-control"
                                            value={this.state.temp} onChange={this.changeTempHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>Upload Your Avatar</label>
                                        <form method="POST" action="/employees" encType="multipart/form-data">
                                            {/* Title:<input type="text" name="title" /> */}
                                            Image:<input type="file" name="image" accept="image/*" onChange={(event) => this.changeImageHandler(event)} />
                                            {/* <input type="submit" value="Upload" />  */}
                                            <input type="" value={this.state.title} />
                                            <img src={`http://localhost:8084/api/v1/user-photos/${this.state.id}/${this.state.title}`} class="rounded float-left" alt="pic1" style={{ paddingLeft: 10, maxWidth: 200 }} />
                                        </form>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
