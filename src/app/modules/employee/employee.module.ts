import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { CoreModule } from '../core/core.module';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [TableComponent, PieChartComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [TableComponent, PieChartComponent]
})
export class EmployeeModule { }
