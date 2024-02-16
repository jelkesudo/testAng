import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iworker } from '../interfaces/iworker';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl:string = 'https://rc-vault-fap-live-1.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]>{
    const apiEndpoint:string = 'api/gettimeentries?code=';
    const apiKey = "vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
    return this.http.get<any[]>(`${this.apiUrl}/${apiEndpoint}${apiKey}`);
  }

  getTotalHoursWorkers(response: any[]): Iworker[]{
    const workersMap: Map<string, Iworker> = new Map();
    response.forEach(r => {
      const { EmployeeName, StarTimeUtc, EndTimeUtc, DeletedOn } = r;

      if(DeletedOn != null) return;
      
      if(EmployeeName == null || EmployeeName == "") return;

      const startTimeStamp: Date = new Date(StarTimeUtc);
      const endTimeStamp: Date = new Date(EndTimeUtc);

      if (isNaN(startTimeStamp.getTime()) || isNaN(endTimeStamp.getTime())) {
        console.error(`Invalid time for start time ${StarTimeUtc} and end time ${EndTimeUtc}`);
        return;
      }

      const miliseconds: number = endTimeStamp.getTime() - startTimeStamp.getTime();
      const workingHours: number = Math.floor(miliseconds / 3600000);

      if(workingHours < 0){
        console.error(`Start time cannot be higher than end time`);
        return;
      }

      if (!workersMap.has(EmployeeName)) {
        workersMap.set(EmployeeName, { name: EmployeeName, workingHours: 0, status: true });
      }

      const worker: Iworker = workersMap.get(EmployeeName)!;
      worker.workingHours += workingHours;
      worker.status = worker.workingHours < 100;
    });
    
    const workers: Iworker[] = Array.from(workersMap.values());
    workers.sort((a, b) => b.workingHours - a.workingHours);
    return workers;
  }
}



