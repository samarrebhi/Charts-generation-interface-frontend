import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import highcharts3D from 'highcharts/highcharts-3d';
import { PersonnechartsService } from './personnecharts.service';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

highcharts3D(Highcharts);

type ChartType = 'line' | 'bar' | 'pie' | 'column';

interface ChartData {
  categories: any[];
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

  attributes: string[] = [];  // Array to store primary attribute names of the main entity
  itemNames: string[] = []; // For item name dropdown options
  itemValues: string[] = []; // For item value dropdown options

  constructor(private s: PersonnechartsService, private fb: FormBuilder) {
    this.chartForm = this.fb.group({
      title: [''],
      subtitle: [''],
      chartType: ['pie'],
      xAxisTitle: [''],
      yAxisTitle: [''],
      dataType: this.fb.group({
        type: [''],
        sqlQuery: ['']
      }),
      itemNames: [],
      itemValues: []
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.s.getallsales().subscribe(
      (data: any) => {
        console.log('Fetched data:', data);
        const allAttributes = this.extractAttributesFromData(data);
        this.itemNames = Array.from(new Set(allAttributes));
        this.itemValues = Array.from(new Set(allAttributes)); // Adjust as needed
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  extractAttributesFromData(data: any): string[] {
    const attributes: Set<string> = new Set();
    const extractFromObject = (obj: any) => {
      if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
          attributes.add(key);
          if (Array.isArray(obj[key])) {
            obj[key].forEach(item => extractFromObject(item));
          } else if (typeof obj[key] === 'object') {
            extractFromObject(obj[key]);
          }
        });
      }
    };

    if (Array.isArray(data)) {
      data.forEach(item => extractFromObject(item));
    } else {
      extractFromObject(data);
    }
    return Array.from(attributes);
  }

  onDropdownChange(event: Event, type: 'itemNames' | 'itemValues'): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log(`Dropdown changed: ${type}, Selected Value: ${selectedValue}`);

    this.updateDropdowns();
  }

  updateDropdowns(): void {
    const selectedItemNames = this.chartForm.get('itemNames')?.value;
    const selectedItemValues = this.chartForm.get('itemValues')?.value;

    this.itemNames = this.attributes.filter(attr => attr !== selectedItemValues);
    this.itemValues = this.attributes.filter(attr => attr !== selectedItemNames);
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

  processData(data: any, chartType: ChartType, formValues: any): ChartData {
    const itemName = formValues.itemNames;
    const itemValue = formValues.itemValues;

    const categories = Array.from(new Set(data.map((item: { [x: string]: any; }) => item[itemName])));
    const seriesData = [{
      name: itemValue,
      data: categories.map(category => data
        .filter((item: { [x: string]: unknown; }) => item[itemName] === category)
        .map((item: { [x: string]: any; }) => item[itemValue])
        .reduce((a: any, b: any) => a + b, 0)),
      type: chartType
    }];

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
      series: data.series,
      
    };

    const chartOptions: Highcharts.Options = {
      ...commonOptions,
      chart: { type: chartType },
      tooltip: {
        pointFormat: chartType === 'pie' 
          ? '{series.name}: <b>{point.percentage:.1f}%</b>'
          : '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        [chartType]: {
          dataLabels: { enabled: true, format: '{point.y}' }
        }
      }
    };

    this.chartOptions = chartOptions;
    Highcharts.chart('chartContainer', this.chartOptions);
  }
}
