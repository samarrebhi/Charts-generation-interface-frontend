import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { PersonnechartsService } from './charts.service';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
highcharts3D(Highcharts);
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component'
import { RouterModule} from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { routes } from './app.routes';
type ChartType = 'line' | 'bar' | 'pie' | 'column';

interface ChartData {
  categories: any[];
  series: Highcharts.SeriesOptionsType[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: 
  [CommonModule, MatIconModule,
    HighchartsChartModule, MatCardModule, 
    MatButtonModule, MatFormFieldModule, 
    MatRadioModule, ReactiveFormsModule, MatSelectModule, 
    MatInputModule,MatDialogModule,
   
    RouterModule],
    
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title='charts'
}
