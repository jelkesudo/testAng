import { Component } from '@angular/core';
import { Iworker } from './interfaces/iworker';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testAng';
}
