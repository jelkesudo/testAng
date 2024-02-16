import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api.service';
import { Iworker } from '../../../interfaces/iworker';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  public chart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (localStorage.getItem("employeeHours") !== null) {
      let storedData = localStorage.getItem("employeeHours");
      if (typeof storedData === 'string') {
        this.createChart(JSON.parse(storedData));
      }
    }
    else{
      this.apiService.getData().subscribe((response) => {
        const workers = this.apiService.getTotalHoursWorkers(response);
        localStorage.setItem("employeeHours", JSON.stringify(workers));
        this.createChart(this.apiService.getTotalHoursWorkers(response));
      });
    }
  }

  createChart(data: Iworker[]){
    const percentageData = this.getNewData(data);
    console.log(percentageData);
    const names = percentageData.map((e) => e.name);
    const percentages = percentageData.map((e) => e.percentage);
    console.log(percentages);
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: names,
	       datasets: [{
          label: 'Percentage',
          data: percentages,
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',
            'teal',
            'purple',
            'indigo',
            'violet',
            'grey'
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
  getNewData(data: Iworker[]){
    let sumHoursWorked = 0;
    data.forEach(d => sumHoursWorked += d.workingHours);
    return data.map((d) => ({
      name: d.name,
      percentage: (d.workingHours / sumHoursWorked) * 100,
    }));
  }
}
