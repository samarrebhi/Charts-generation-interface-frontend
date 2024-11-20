import * as Highcharts from 'highcharts';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
@Component({
  selector: 'app-chart-dialog',
  standalone: true,
  
  imports:[MatIconModule,HighchartsChartModule,CommonModule],
  templateUrl: './chart-dialog.component.html',
  styleUrl: './chart-dialog.component.css'
})
export class ChartDialogComponent {
  highcharts = Highcharts;

  constructor(
    public dialogRef: MatDialogRef<ChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public chartOptions: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
