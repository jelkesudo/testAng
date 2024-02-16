import { Component, Input} from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Iworker } from '../../../interfaces/iworker';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  workers: Iworker[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (localStorage.getItem("employeeHours") !== null) {
      let storedData = localStorage.getItem("employeeHours");
      if (typeof storedData === 'string') {
        this.workers = JSON.parse(storedData);
      } 
    }
    else{
      this.apiService.getData().subscribe((response) => {
        this.workers = this.apiService.getTotalHoursWorkers(response);
        localStorage.setItem("employeeHours", JSON.stringify(this.workers));
      });
    }
  }
}
