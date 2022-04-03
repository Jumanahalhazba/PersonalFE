import "@progress/kendo-theme-material/dist/all.css";
import "@progress/kendo-theme-material/dist/all.css";
import { TileLayout } from "@progress/kendo-react-layout";
import EmployeeService from "../services/EmployeeService";
import React, { Component, useEffect, useState } from "react";

import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import moment from "moment";

class AnalysisPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      min: null,
      max: null,
      avg: null,
    };
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      console.log(res.data);

      let emps = res.data;
      let temps = [];

      for (let i = 0; i < emps.length; i++) {
        temps.push(+emps[i].temp);
      }

      this.setState({
        employees: emps,
        min: this.min(temps),
        max: this.max(temps),
        avg: this.avg(temps),
      });

      this.handleChartDate(emps);
    });
  }

  async handleChartDate(emps) {
    let lastWeekDateLabels = [];

    for (let index = 0; index < emps.length; index++) {
      await this.setUpChart(emps[index].id).then((x) => {
        lastWeekDateLabels.push([x]);
      });
    }

    this.setUpChartWeekAvg(lastWeekDateLabels);
  }

  async setUpChart(id) {
    const maxDate = new Date();
    const minDate = new Date(maxDate.getDate() - 7);

    return await EmployeeService.getEmployeeHistory(id).then((res) => {
      let temps = [];

      let labels = res.data.map((item) => {
        return moment(item.date).format("MMM Do YY");
      });

      let data = res.data.map((item) => {
        if (new Date(item.date).getTime() > minDate.getTime()) {
          temps.push({
            label: moment(item.date).format("MMM Do YY"),
            data: +item.temp,
          });
        }

        return item.temp;
      });

      const ctx = document.getElementById("myChart-" + id);
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature",
              data: data,
              backgroundColor: ["#aaff4e"],
              borderColor: ["#aaff4e"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              min: 35,
              max: 38,
            },
          },
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 0.4,
              to: 0.2,
              loop: true,
            },
          },
          responsive: false,
        },
      });

      return temps;
    });
  }

  setUpChartWeekAvg(data) {
    let labels = [];
    let dataSets = [];
    let chartData = [];
    let barChartData = [];

    const date = new Date();
    date.setDate(new Date(date.getDate() - 7));

    for (let i = 0; i < 7; i++) {
      date.setDate(new Date(date.getDate() + 1));
      labels.push(moment(new Date(date)).format("MMM Do YY"));
      dataSets[i] = [];
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i][0].length; j++) {
        let x = data[i][0];

        const index = labels.indexOf(x[j].label);
        if (index != -1) {
          dataSets[index].push(x[j].data);
        }
      }
    }

    for (let i = 0; i < dataSets.length; i++) {
      barChartData.push(dataSets[i].length);
      if (dataSets[i].length > 0) chartData.push(this.avg(dataSets[i]));
      else {
        chartData.push(0);
      }
    }

    const ctx = document.getElementById("week-avg");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Average temperature for the week",
            data: chartData,
            backgroundColor: ["#aaff4e"],
            borderColor: ["#aaff4e"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 0.4,
            to: 0.2,
            loop: true,
          },
        },
        responsive: true,
      },
    });

    const ctx1 = document.getElementById("user-avg");
    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Users per day for the last week",
            data: barChartData,
            backgroundColor: ["#aaff4e"],
            borderColor: ["#aaff4e"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
              stepSize: 1,
            },
          },
        },
        responsive: true,
      },
    });
  }

  avg(num) {
    let total = 0;
    for (let i = 0; i < num.length; i++) {
      total += num[i];
    }
    return total / num.length;
  }

  min(num) {
    let min = num[0];
    for (let i = 1; i < num.length; i++) {
      if (num[i] < min) {
        min = num[i];
      }
      return min;
    }
  }
  max(num) {
    let max = num[0];
    for (let i = 1; i < num.length; i++) {
      if (num[i] > max) {
        max = num[i];
      }
    }
    return max;
  }

  render() {
    return (
      <div className="chart-container container">
        <h2>Analytics</h2>
        <p>Minimum temp for the day: {this.state.min}</p>
        <p>Maximum temp for the day: {this.state.max}</p>
        <p>
          Average temp for the day:{" "}
          {(Math.round(this.state.avg * 100) / 100).toFixed(2)}
        </p>

        <canvas id="user-avg" className="my-chart"></canvas>
        <canvas id="week-avg" className="my-chart"></canvas>

        {this.state.employees.map((employee, i) => (
          <div className="emp-chart">
            <div className="emp-chart-data">
              <p>
                {employee.firstName} {employee.lastName} - {employee.emailId}
              </p>
              <img
                src={`http://localhost:8084/api/v1/user-photos/${employee.id}/${employee.title}`}
                alt="avater"
                className="chart-img"
              />
            </div>
            <div className="emp-chart-chart">
              <canvas
                id={"myChart-" + employee.id}
                className="my-chart"
              ></canvas>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AnalysisPage;
