import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PersonnechartsService } from './personnecharts.service';
import { HttpClientModule } from '@angular/common/http';

highcharts3D(Highcharts);
import highcharts3D from 'highcharts/highcharts-3d';


interface DataItem<T> {
  name: string;
  value: T;
}

interface ChartData {
  categories: string[];
  series: any[];
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HighchartsChartModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

   title='Charts';
   highcharts = Highcharts;
   Highcharts: typeof Highcharts = Highcharts;

   sales=[];
   constructor(private s: PersonnechartsService) {}


///////////////////////////////////////

getallsales(): void {
  this.s.getallsales().subscribe(
    (data: []) => {
      this.sales = data;
     
      console.log('Fetched sales:', this.sales);
    },
    (error) => {
      console.error('Error fetching sales:', error);
    }
  );
}
 ngOnInit(): void {
this.getallsales();


 this.fetchProcessAndGenerateChart('line',item => ({
    // que ce soit nombre or pourcentage wala ay haja nheb nehsebha bl
    // attributs w nesthakha fl affichage

    name: item.store.storeName,
    value: item.totalAmount

  }));

}

fetchProcessAndGenerateChart<T>(chartType: string, transformFn: (item: any) => DataItem<T>): void {
/// change data men hne
  this.s.getallsales().subscribe((data) => {
    const processedData = this.s.processData(data, chartType, transformFn);

    this.generateChart(processedData, 'line');

    ///test chnchouf prep data li bch tethat fl axes y w x
    console.log("processed data ",processedData)

  });
 
}
/////
chartOptionsapijoker: any = {};
generateChart(data: ChartData, chartType: string): void {
  const commonOptions = {
    title: { text: ` (${chartType} Chart Title)` },
    xAxis: { categories: data.categories },
    series: data.series,
  };

  switch(chartType) {
    case 'pie':
      this.chartOptionsapijoker = {
        ...commonOptions,
        chart: { type: 'pie' },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        }
      };
      break;
    case 'bar':
      this.chartOptionsapijoker = {
        ...commonOptions,
        chart: { type: 'bar' },
        yAxis: {          
          title:{
             text:"choose categories name"
          } 
       },
       tooltip: {
          valueSuffix:" {item.value}",
          style:{
             color:'#A005F8'
          }
       },
       
        
      };
      break;
    case 'line':
      this.chartOptionsapijoker = {
        ...commonOptions,
        chart: { type: 'line' },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }
          }
        }
      };
      break;
    default:
      throw new Error('Unsupported chart type');
  }
  
  Highcharts.chart('chartContainerapijoker', this.chartOptionsapijoker);
}

}


