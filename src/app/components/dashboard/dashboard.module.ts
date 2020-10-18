import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TableComponent } from '../../components/table/table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';
import { DialogComponent } from '../dialog/dialog.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    DashboardComponent,
    TableComponent,
    ToolbarComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  entryComponents: [DialogComponent],
})
export class DashboardModule {}
