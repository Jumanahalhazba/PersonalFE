import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            title: '',
            temp: '',
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({firstName: employee.firstName,
                lastName: employee.lastName,
                emailId : employee.emailId,
                title: employee.title,
                temp: employee.temp
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, title: this.state.title.name, temp: this.state.temp};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
    }
    


    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changeImageHandler= (event) => {
        console.log(event.target.files[0])  
        this.setState({title: event.target.files[0]});
        //this.setState({title: event.target.value});
    }

    changeTempHandler= (event) => {
        this.setState({temp: event.target.value});
    }



    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Upload Your Avatar</label>
                                            <form method="POST" action="/employees" encType="multipart/form-data">
                                                {/* Title:<input type="text" name="title" /> */}
                                                Image:<input type="file" name="image" accept="image/*" onChange={(event)=>this.changeImageHandler(event)}/>
                                                {/* <input type="submit" value="Upload" />  */}
                                                <input type="" value={this.state.title}/>
                                                 <img src={`http://localhost:8084/api/v1/user-photos/${this.state.id}/${this.state.title}`} class="rounded float-left" alt="pic1" style={{ paddingLeft: 10, maxWidth: 200 }}  /> 
                                            </form>
                                        </div>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="title" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeImageHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Temp: </label>
                                            <input placeholder="temp" name="temp" className="form-control" 
                                                value={this.state.temp} onChange={this.changeTempHandler}/>
                                        </div>
                                        
                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
