import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // data
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
      title: "",
      temp: "",

      // errors
      firstNameError: true,
      lastNameError: true,
      emailIdError: true,
      titleError: true,
      tempError: true,

      //form input states
      firstNameTouched: false,
      lastNameTouched: false,
      emailIdTouched: false,
      titleTouched: false,
      tempTouched: false,

      //form error messages
      tempErrorMessage: "Enter a valid temperature",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;

        let temp = this.checkTemp(employee.temp);

        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
          title: employee.title,
          temp: employee.temp,

          firstNameError: this.checkLengthError(employee.firstName),
          lastNameError: this.checkLengthError(employee.lastName),
          emailIdError: this.checkLengthError(employee.emailId),
          titleError: this.checkLengthError(employee.title),
          tempError: this.checkLengthError(employee.temp) || temp.value,

          firstNameTouched: true,
          lastNameTouched: true,
          emailIdTouched: true,
          titleTouched: true,
          tempTouched: true,

          tempErrorMessage: temp.message,
        });
      });
    }
  }
  saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    this.setState(
      {
        firstNameTouched: true,
        lastNameTouched: true,
        emailIdTouched: true,
        titleTouched: true,
        tempTouched: true,
      },
      () => {
        if (
          (this.state.firstNameTouched && this.state.firstNameError) ||
          (this.state.lastNameTouched && this.state.lastNameError) ||
          (this.state.emailIdTouched && this.state.emailIdError) ||
          (this.state.titleTouched && this.state.titleError) ||
          (this.state.tempTouched && this.state.tempError)
        ) {
          return;
        }

        if (this.state.id === "_add") {
          let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            title: this.state.title.name,
            temp: this.state.temp,
          };
          EmployeeService.createEmployee(employee, this.state.title).then(
            (res) => {
              this.props.history.push("/employees");
            }
          );
        } else {
          if (this.state.title.name != null) {
            let employee = {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              emailId: this.state.emailId,
              title: this.state.title.name,
              temp: this.state.temp,
            };
            EmployeeService.updateEmployee(
              employee,
              this.state.id,
              this.state.title
            ).then((res) => {
              this.props.history.push("/employees");
            });
          } else {
            let employee = {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              emailId: this.state.emailId,
              title: this.state.title,
              temp: this.state.temp,
            };

            EmployeeService.updateEmployee(employee, this.state.id, null).then(
              (res) => {
                this.props.history.push("/employees");
              }
            );
          }
        }
      }
    );
  };

  checkLengthError(input) {
    if (input.length <= 0) return true;

    return false;
  }

  checkTemp(input) {
    if (input > 38) {
      return { value: true, message: "Temperature is above safe levels" };
    } else if (input < 35) {
      return { value: true, message: "Temperature is below safe levels" };
    }

    return { value: false, message: "Temperature is safe" };
  }

  changeFirstNameHandler = (event) => {
    this.setState({
      firstName: event.target.value,
      firstNameError: this.checkLengthError(event.target.value),
      firstNameTouched: true,
    });
  };

  changeLastNameHandler = (event) => {
    this.setState({
      lastName: event.target.value,
      lastNameError: this.checkLengthError(event.target.value),
      lastNameTouched: true,
    });
  };

  changeEmailHandler = (event) => {
    this.setState({
      emailId: event.target.value,
      emailIdError: this.checkLengthError(event.target.value),
      emailIdTouched: true,
    });
  };
  changeImageHandler = (event) => {
    this.setState({
      title: event.target.files[0],
      titleError: this.checkLengthError(event.target.files),
      titleTouched: true,
    });
  };

  changeTempHandler = (event) => {
    let tempError = this.checkTemp(event.target.value);
    this.setState({
      temp: event.target.value,
      tempError: this.checkLengthError(event.target.value) || tempError.value,
      tempTouched: true,
      tempErrorMessage: tempError.message,
    });
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }

  getImage() {
    if (this.state.id === "_add") {
      if (this.state.title) {
        return (
          <img
            src={URL.createObjectURL(this.state.title)}
            className="rounded img-card"
            alt="image"
          />
        );
      }
      return;
    } else {
      return (
        <img
          src={`http://localhost:8084/api/v1/user-photos/${this.state.id}/${this.state.title}`}
          className="rounded img-card"
          alt="image"
        />
      );
    }
  }
  render() {
    return (
      <div className="container card-container">
        <h2>{this.getTitle()}</h2>

        <div className="card-body">
          <form>
            <div className="form-group">
              <label> First Name: </label>
              <br />
              <label
                className={
                  "warning " +
                  (this.state.firstNameError && this.state.firstNameTouched
                    ? ""
                    : "disabled")
                }
              >
                First name cannot be empty
              </label>
              <input
                placeholder="First Name"
                name="firstName"
                className={
                  "form-control " +
                  (this.state.firstNameError && this.state.firstNameTouched
                    ? "disabled-text-input"
                    : "")
                }
                value={this.state.firstName}
                onChange={this.changeFirstNameHandler}
              />
            </div>
            <div className="form-group">
              <label> Last Name: </label> <br />
              <label
                className={
                  "warning " +
                  (this.state.lastNameError && this.state.lastNameTouched
                    ? ""
                    : "disabled")
                }
              >
                Last name cannot be empty
              </label>
              <input
                placeholder="Last Name"
                name="lastName"
                className="form-control"
                value={this.state.lastName}
                onChange={this.changeLastNameHandler}
              />
            </div>
            <div className="form-group">
              <label> Email address: </label> <br />
              <label
                className={
                  "warning " +
                  (this.state.emailIdError && this.state.emailIdTouched
                    ? ""
                    : "disabled")
                }
              >
                Email address cannot be empty
              </label>
              <input
                placeholder="Email Address"
                name="emailId"
                className="form-control"
                value={this.state.emailId}
                onChange={this.changeEmailHandler}
                type="email"
              />
            </div>
            <div className="form-group">
              <label> Temperature: </label> <br />
              <label
                className={
                  "warning " +
                  (this.state.tempTouched && this.state.tempError
                    ? ""
                    : "disabled")
                }
              >
                {this.state.tempErrorMessage}
              </label>
              <input
                placeholder="temp"
                name="temp"
                className="form-control"
                value={this.state.temp}
                onChange={this.changeTempHandler}
                type="number"
              />
            </div>
            <div className="form-group">
              <label>Upload Your Avatar</label> <br />
              <label
                className={
                  "warning " +
                  (this.state.titleError && this.state.titleTouched
                    ? ""
                    : "disabled")
                }
              >
                Avatar cannot be empty
              </label>
              <div className=" custom-file-uploader">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => this.changeImageHandler(event)}
                  className="my-custom-file-input"
                />
                {this.getImage()}
              </div>
            </div>
            <div className="form-group float-right">
              <button
                className="btn btn-success"
                onClick={this.saveOrUpdateEmployee}
              >
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={this.cancel.bind(this)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;
