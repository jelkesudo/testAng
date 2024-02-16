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
    this.apiService.getData().subscribe((response) => {
      this.workers = this.apiService.getTotalHoursWorkers(response);
    });
  }
}
