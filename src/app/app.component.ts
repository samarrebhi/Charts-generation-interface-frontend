import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PersonnechartsService } from './personnecharts.service';
import { HttpClientModule } from '@angular/common/http';

highcharts3D(Highcharts);
import highcharts3D from 'highcharts/highcharts-3d';



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
   constructor(private s: PersonnechartsService) {}

   ngOnInit(): void {
     
 this.fetchAllData();
 

   }



chartOptionsapi : Highcharts.Options = {   
   chart : {
      
      plotShadow: false
   }, subtitle: {
      text: 'Data from backend api'
    },
   title : {
      text: 'Distribution of Persons by Governments'   
   },
   tooltip : {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
   },
   plotOptions : {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            
         }
      }
   },
   series : []
};

 
////// area chart from backend
chartOptionsapi2: Highcharts.Options = {
   chart: {
     type: 'areaspline'
   },
   title: {
     text: 'Percentage of persons per government'
   },
   subtitle: {
     text: 'Fetched data from backend',
     style: {
       position: 'absolute',
       right: '0px',
       bottom: '10px',color:'#15D27F'
     }
   },
   legend: {
     layout: 'vertical',
     align: 'left',
     verticalAlign: 'top',
     x: -150,
     y: 100,
     floating: true,
     borderWidth: 1,
     
   },
   xAxis: {
     categories: []  
   },
   yAxis: {
     title: {
       text: 'Percentage of persons',
       style:{ color:'#0F7117'}
      
     },
     labels: {
       format: '{value} %'
     }
   },
   tooltip: {
     shared: true,
     valueSuffix: ' %'
   },
   plotOptions: {
     areaspline: {
       fillOpacity: 0.3,
       color:'#FFA500'
     }
   },
   credits: {
     enabled: false
   },
   series: []  
 };


 ////scatter chart from backend !!! non compatible

 chartOptionsapi3:Highcharts.Options= {         
   chart: {
      type: 'scatter',
      
    },
    title : {
      text: 'Scatter plot'   
   },
   
    series: []
  };
 

 /// column chart for data from backend
 chartOptionsapi4: Highcharts.Options = {
   chart: {
     type: 'column'
   },
   title: {
     text: 'Distribution of persons by governments'
   },
   subtitle: {
     text: 'Data from backend'
   },
   xAxis: {
     categories: [],
     crosshair: true
   },
   yAxis: {
     title: {
       text: 'Percentage and Number of Persons'
     }
   },
   tooltip: {
     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
       '<td style="padding:0"><b>{point.y:.1f} % ({point.persons} Persons)</b></td></tr>',
     footerFormat: '</table>',
     shared: true,
     useHTML: true
   },
   plotOptions: {
     column: {
       pointPadding: 0.2,
       borderWidth: 0
     }
   },
   series: []
 };
 

 updateChartapi4(): void {
   if (this.highcharts && this.highcharts.chart) {
      this.highcharts.chart('chartContainerapi4', this.chartOptionsapi4);
    }
 }

 ///// line chart data from api
chartOptionsapi5:Highcharts.Options = {   
   chart: {
      type: "spline"
   },
   title: {
      text: "Number of persons per government"
   },
   subtitle: {
      text: "Fetched data from backend"
   },
   xAxis:{
      categories:[]
   },
   yAxis: {          
      title:{
         text:"Number of Persons"
      } 
   },
   tooltip: {
      valueSuffix:" Persons",
      style:{
         color:'#0535F8'
      }
   },
   series:  [] 
   
 };
 
///// bar chart data from api
chartOptionsapi6:Highcharts.Options = {   
   chart: {
      type: "bar"
   },
   title: {
      text: "Number of persons per government"
   },
   subtitle: {
      text: "Fetched data from backend"
   },
   xAxis:{
      categories:[]
   },
   yAxis: {          
      title:{
         text:"Number of Persons"
      } 
   },
   tooltip: {
      valueSuffix:" Persons",
      style:{
         color:'#A005F8'
      }
   },
   series:  [] 
   
 };
 
 
///////////////////////////// une function for all
fetchAllData(): void {
   this.s.getallgouv().subscribe((data) => {
     const totalPersons = data.reduce((acc, gouv) => acc + gouv.personneList.length, 0);
     const categories = data.map((gouv) => gouv.gouverneratLibelle);
     const seriesData = data.map((gouv) => ({
       name: gouv.gouverneratLibelle,
       y: (gouv.personneList.length / totalPersons) * 100,
       persons: gouv.personneList.length
     }));

     // Pie chart
     this.chartOptionsapi.series = [{
       type: 'pie',
       name: 'Percentage',
       data: seriesData.map(item => ({
         name: item.name,
         y: item.y,
         data: [item.name, item.persons]
       }))
     }];

     // Area chart
     this.chartOptionsapi2.xAxis = { categories };
     this.chartOptionsapi2.series = [{
       type: 'areaspline',
       name: 'Percentage of persons',
       data: seriesData.map(item => item.y)
     }];

     // Scatter chart
     this.chartOptionsapi3.xAxis = { categories };
     this.chartOptionsapi3.series = [{
       type: 'scatter',
       name: 'Percentage of persons',
       data: seriesData.map(item => ({
         x: parseFloat(item.name),
         y: item.y
       }))
     }];

     // Column chart
     this.chartOptionsapi4.xAxis = { categories };
     this.chartOptionsapi4.series = [{
       type: 'column',
       name: 'Percentage of persons',
       data: seriesData.map(item => ({
         y: item.y,
         persons: item.persons
       }))
     }];

     // Spline chart
     this.chartOptionsapi5.xAxis = { categories };
     this.chartOptionsapi5.series = [{
       type: 'spline',
       name: 'Number of persons',
       data: seriesData.map(item => item.persons),
       color: '#EF881B'
     }];

     // Bar chart
     this.chartOptionsapi6.xAxis = { categories };
     this.chartOptionsapi6.series = [{
       type: 'bar',
       name: 'Number of persons',
       data: seriesData.map(item => item.persons),
       color: '#07E83A'
     }];

     this.updateCharts();
   });
 }

 updateCharts(): void {
   if (this.highcharts && this.highcharts.chart) {
     this.highcharts.chart('chartContainerapi', this.chartOptionsapi);
     this.highcharts.chart('chartContainerapi2', this.chartOptionsapi2);
     this.highcharts.chart('chartContainerapi3', this.chartOptionsapi3);
     this.highcharts.chart('chartContainerapi4', this.chartOptionsapi4);
     this.highcharts.chart('chartContainerapi5', this.chartOptionsapi5);
     this.highcharts.chart('chartContainerapi6', this.chartOptionsapi6);
   }
 }

}

