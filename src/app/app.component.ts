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

  attributes: string[] = []; 
  itemNames: string[] = []; 
  itemValues: string[] = []; 

  constructor(private s: PersonnechartsService, private fb: FormBuilder) {
    this.chartForm = this.fb.group({
      title: [''],
      subtitle: [''],
      chartType: ['pie'],
      xAxisTitle: [''],
      yAxisTitle: [''],
      sqlQuery: [''],
      dataType: this.fb.group({
        type: [''],
        
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
        this.itemValues = Array.from(new Set(allAttributes)); 
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  extractAttributesFromData(data: any): string[] {
    const attributes: Set<string> = new Set();
    
    // Recursive function to traverse through objects and arrays
    const extractFromObject = (obj: any) => {
      if (obj && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
          // Skip numeric keys
          if (isNaN(Number(key))) {
            attributes.add(key);
          }
          const value = obj[key];
  
          // Recursively process arrays
          if (Array.isArray(value)) {
            value.forEach((item: any) => extractFromObject(item));
          } 
          // Recursively process nested objects
          else if (typeof value === 'object') {
            extractFromObject(value);
          }
        });
      }
    };
  
    extractFromObject(data);
    return Array.from(attributes);
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

/////partiesqlquery
const sqlQuery = this.chartForm.get('sqlQuery')?.value;

console.log('sqlQuery:',sqlQuery);

if (sqlQuery) {
  this.s.executeQuery(sqlQuery).subscribe(
    (response: any) => {
    
      const sqlQueryrespondedata=response;
      console.log('Response from server:', sqlQueryrespondedata);

    },
    (error) => {
      console.error('Error sending data:', error);
     alert('Error sending sql query');
    }
  );}


}




processData(data: any, chartType: ChartType, formValues: any): ChartData {
  const itemName = formValues.itemNames;
  const itemValue = formValues.itemValues;

  const categories = Array.from(new Set(data.map((item: { [x: string]: any; }) => item[itemName])));

  const seriesData = categories.map(category => ({
    name: category,
    y: data
      .filter((item: { [x: string]: unknown; }) => item[itemName] === category)
      .map((item: { [x: string]: any; }) => item[itemValue])
      .reduce((a: any, b: any) => a + b, 0)
  }));

  let series: Highcharts.SeriesOptionsType;

  switch (chartType) {
    case 'line':
      series = {
        type: 'line',
        name: itemValue,
        data: seriesData
      } as Highcharts.SeriesLineOptions;
      break;
    case 'column':
      series = {
        type: 'column',
        name: itemValue,
        data: seriesData
      } as Highcharts.SeriesColumnOptions;
      break;
    case 'bar':
      series = {
        type: 'bar',
        name: itemValue,
        data: seriesData
      } as Highcharts.SeriesBarOptions;
      break;
    case 'pie':
      series = {
        type: 'pie',
        name: itemValue,
        data: seriesData.map(item => ({
          name: item.name,
          y: item.y
        }))
      } as Highcharts.SeriesPieOptions;
      break;
    default:
      throw new Error(`Unsupported chart type: ${chartType}`);
  }

  return {
    categories,
    series: [series]
  };
}
  generateChart(data: ChartData, chartType: ChartType, formValues: any): void {
    const commonOptions: Highcharts.Options = {
      title: { text: formValues.title },
      subtitle: { text: formValues.subtitle },
      xAxis: { categories: data.categories, title: { text: formValues.xAxisTitle } },
      yAxis: { title: { text: formValues.yAxisTitle } },
      series: data.series,
      chart: {type: chartType ,
      }
     
    };
  
   
    let plotOptions: Highcharts.PlotOptions = {};
  
    
    switch (chartType) {
      case 'line':
        plotOptions = {
          line: {
            dataLabels: { enabled: true, format: '{point.y:.2f}' },
            marker: { enabled: true },
            animation: { duration: 1000 }
          }
        };
        break;
  
      case 'column':
        plotOptions = {
          column: {
            dataLabels: { enabled: true, format: '{point.y:.2f}' },
            animation: { duration: 1000 },
            pointPadding: 0.1,
            borderWidth: 0
          }
        };
        break;
  
      case 'bar':
        plotOptions = {
          bar: {
            dataLabels: { enabled: true, format: '{point.y:.2f}' },
            animation: { duration: 1000 },
            pointPadding: 0.2,
            borderWidth: 0
          }
        };
        break;
  
      case 'pie':
        plotOptions = {
          pie: {
            dataLabels: { enabled: true, format:'{point.name}: <b>{point.percentage:.2f}%</b>' },
            innerSize: '50%',
            size: '100%',
           
            animation: { duration: 1500 }
          }
        };
        break;
  
      default:
        console.error('Unsupported chart type:', chartType);
        return;
    }
  

    const chartOptions: Highcharts.Options = {
      ...commonOptions,
      
      plotOptions, 
      
      

    };

   
  
 
    console.log('Chart Options:', chartOptions);
  

    try {
      this.chartOptions = chartOptions;
      Highcharts.chart('chartContainergenerated',  this.chartOptions);
    } catch (error) {
    //  alert("enable to create chart")
      console.error('Error creating chart:', error);
    }
  }

 
}
