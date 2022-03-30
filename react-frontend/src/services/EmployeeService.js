import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8084/api/v1/employees";

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee, multipartFile) {
        console.log('Emp', employee);
        console.log('img', multipartFile);

        let formData = new FormData();
        formData.append("multipartFile", multipartFile);
        formData.append("firstName", employee.firstName);
        formData.append("lastName", employee.lastName);
        formData.append("emailId", employee.emailId);
        formData.append("title", employee.title);
        formData.append("temp", employee.temp);


        return axios.post(EMPLOYEE_API_BASE_URL + '/save', formData);
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId, file) {
        let formData = new FormData();
        formData.append("multipartFile", file);
        formData.append("firstName", employee.firstName);
        formData.append("lastName", employee.lastName);
        formData.append("emailId", employee.emailId);
        formData.append("title", employee.title);
        formData.append("temp", employee.temp);

        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, formData);
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()