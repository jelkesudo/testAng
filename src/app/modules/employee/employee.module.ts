import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [TableComponent]
})
export class EmployeeModule { }
