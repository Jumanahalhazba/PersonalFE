import "@progress/kendo-theme-material/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import EmployeeService from "../services/EmployeeService";
import React, { Component, useEffect, useState } from 'react'

class AnalysisPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            min: null,
            max: null,
            avg: null
        }
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            console.log(res.data)

            let emps = res.data;
            let temps = [];

            for (let i = 0; i < emps.length; i++) {
                temps.push(+emps[i].temp);
            }

            this.setState({
                min: this.min(temps),
                max: this.max(temps),
                avg: this.avg(temps),
            })
        });
    }

    avg(num) {
        let total = 0;
        for (let i = 0; i < num.length; i++) {
            total += num[i];
        }
        return total / num.length
    }

    min(num) {
        let min = num[0];
        for (let i = 1; i < num.length; i++) {
            if (num[i] < min) {
                min = num[i];
            }
            return min
        }
    }
    max(num) {
        console.log(num);
        let max = num[0];
        for (let i = 1; i < num.length; i++) {
            console.log(num[i])
            if (num[i] > max) {
                max = num[i];
            }
        }
        return max
    }

    render() {
        return (
            <div className="App">
                <p>{this.state.min}</p>
                <p>{this.state.max}</p>
                <p>{this.state.avg}</p>
            </div>
        )
    }
}


export default AnalysisPage;
