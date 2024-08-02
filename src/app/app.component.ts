import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { PersonnechartsService } from './personnecharts.service';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import highcharts3D from 'highcharts/highcharts-3d';

highcharts3D(Highcharts);

type ChartType = 'line' | 'bar' | 'pie' | 'column';

interface ChartData {
  categories: string[];
  series: Highcharts.SeriesOptionsType[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, MatSelectModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Charts';
  highcharts = Highcharts;
  chartOptions: Highcharts.Options | null = null;
  chartForm: FormGroup;

  showAxisTitles = false;
  isSqlQuery = false;
  isColumnChoice = false;

  constructor(private s: PersonnechartsService, private fb: FormBuilder) {
    this.chartForm = this.fb.group({
      title: [''],
      subtitle: [''],
      chartType: ['pie'],
      xAxisTitle: [''],
      yAxisTitle: [''],
      dataType: this.fb.group({
        type: [''],
        sqlQuery: [''],
        itemNames: [''],
        itemValues: ['']
      })
    });
  }

  ngOnInit(): void {
    this.getallsales();
  }

  attributes: string[] = [];  // Array to store primary attribute names of the main entity
  nestedAttributes: { [key: string]: string[] } = {};  // Object to store nested attribute names of array attributes

  itemNames: string[] = []; // For item name dropdown options
  itemValues: string[] = []; // For item value dropdown options

  getallsales(): void {
    this.s.getallsales().subscribe(
      (data: any[]) => {
        console.log('Fetched sales:', data);

        if (data.length > 0) {
          const firstItem = data[0];
          console.log('First item:', firstItem);

          if (firstItem) {
            // Extract primary attribute names
            this.attributes = Object.keys(firstItem);
            console.log('Primary attributes:', this.attributes);

            // Extract and log nested attribute names
            this.nestedAttributes = {}; // Reset nestedAttributes

            this.attributes.forEach(attr => {
              const value = firstItem[attr];
              if (typeof value === 'object' && !Array.isArray(value)) {
                // Handle nested objects
                this.nestedAttributes[attr] = Object.keys(value);
                console.log(`Nested attributes for "${attr}":`, this.nestedAttributes[attr]);
              } else if (Array.isArray(value)) {
                // Handle arrays
                this.nestedAttributes[attr] = value.length > 0 && typeof value[0] === 'object' ? Object.keys(value[0]) : ['index'];
                console.log(`Array attributes for "${attr}":`, this.nestedAttributes[attr]);
              } else {
                // Handle simple attributes
                this.nestedAttributes[attr] = [];
                console.log(`Simple attribute for "${attr}": No nested attributes`);
              }
            });

            // Update item names and values dropdowns
            this.updateDropdowns();
          }
        }
      },
      (error) => {
        console.error('Error fetching sales:', error);
      }
    );
  }

  updateDropdowns(): void {
    // Flatten primary attributes and nested keys
    this.itemNames = this.attributes.flatMap(attr => [attr, ...this.nestedAttributes[attr]]);
    this.itemValues = [...this.attributes]; // Adjust based on your needs

    console.log('Item names:', this.itemNames);
    console.log('Item values:', this.itemValues);
  }

  onChartTypeChange(event: any): void {
    const selectedType = event.target.value;
    this.showAxisTitles = ['bar', 'column', 'line'].includes(selectedType);
  }

  onDataTypeChange(type: string): void {
    this.isSqlQuery = type === 'sql';
    this.isColumnChoice = type === 'columnChoice';
  }

  onSubmit(): void {
    const formValues = this.chartForm.value;
    const chartType = formValues.chartType as ChartType;

    this.s.getallsales().subscribe((data) => {
      const processedData = this.processData(data, chartType, formValues);
      this.generateChart(processedData, chartType, formValues);
    });
  }

  processData(data: any[], chartType: ChartType, formValues: any): ChartData {
    // Handle possible null or undefined values in data
    const itemName = formValues.dataType.itemNames;
    const itemValue = formValues.dataType.itemValues;

    const categories = Array.from(new Set(data.map(item => item[itemName]).filter(item => item != null)));
    const seriesData = [{
      name: itemValue,
      data: categories.map(category => data.filter(item => item[itemName] === category).map(item => item[itemValue]).reduce((a, b) => a + b, 0)),
      type: chartType
    }];

    console.log('categories:', categories);
    console.log('series:', seriesData);

    return {
      categories,
      series: seriesData
    };
  }

  generateChart(data: ChartData, chartType: ChartType, formValues: any): void {
    const commonOptions: Highcharts.Options = {
      title: { text: formValues.title },
      subtitle: { text: formValues.subtitle },
      xAxis: { categories: data.categories, title: { text: formValues.xAxisTitle } },
      yAxis: { title: { text: formValues.yAxisTitle } },
      series: data.series
    };

    switch (chartType) {
      case 'pie':
        this.chartOptions = {
          ...commonOptions,
          chart: { type: 'pie' },
          tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.percentage:.1f} %' }
            }
          }
        };
        break;
      case 'bar':
        this.chartOptions = {
          ...commonOptions,
          chart: { type: 'bar' },
          tooltip: { valueSuffix: ' units' }
        };
        break;
      case 'line':
        this.chartOptions = {
          ...commonOptions,
          chart: { type: 'line' },
          tooltip: { pointFormat: '{series.name}: <b>{point.y}</b>' },
          plotOptions: {
            line: {
              dataLabels: { enabled: true, format: '{point.y}' }
            }
          }
        };
        break;
      case 'column':
        this.chartOptions = {
          ...commonOptions,
          chart: { type: 'column' },
          tooltip: { pointFormat: '{series.name}: <b>{point.y}</b>' },
          plotOptions: {
            column: {
              dataLabels: { enabled: true, format: '{point.y}' }
            }
          }
        };
        break;
      default:
        throw new Error('Unsupported chart type');
    }

    Highcharts.chart('chartContainer', this.chartOptions);
  }
}
