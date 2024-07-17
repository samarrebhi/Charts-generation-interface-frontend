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
     this.fetchData();
     this.fetchgouv();
 this.fetchgouvapi2();
 this.fetchgouvapi4();
 this.fetchgouvapi3();
 this.fetchgouvapi5();
 this. fetchgouvapi6();
 

   }
////scatter chart

////area chart
   chartOptions5: Highcharts.Options  = {   
      chart: {
        type: 'areaspline'
      },
      title: {
        text: 'Average fruit consumption during one week'
      },
      subtitle : {text:'Fetched data from backend',
         style: {
            position: 'absolute',
            right: '0px',
            bottom: '10px'
         }
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: -150,
         y: 100,
         floating: true,
         borderWidth: 1,
        
         backgroundColor: 
              '#FFFFFF'
      },
      xAxis:{
         categories: ['Monday','Tuesday','Wednesday','Thursday',
            'Friday','Saturday','Sunday'] 
      },
      yAxis : {
         title: {
            text: 'Number of units'
         }
      },
      tooltip : {
         shared: true, valueSuffix: ' units'
      },
      plotOptions : {
         area: {
            fillOpacity: 0.5 
         }
      },
      credits:{
        enabled: false
      },
      series: [
         {type: 'areaspline',
            name: 'John',
            data: [3, 4, 3, 5, 4, 10, 12]
         }, 
         {type: 'areaspline',
            name: 'Jane',
            data: [1, 3, 4, 3, 3, 5, 4]
         }
      ]
   };
 ///fetching dta from json server
   fetchData(): void {
     this.s.getCities().subscribe((data) => {

      const seriesData = data.map((city) => ({
        
         type:city.type,
         name: city.name,
         data: city.data,
       }));
 
       this.chartOptions2.series = seriesData;

       this.updateChart();

      // console.log(data, this.chartOptions2.series);
     });
   }
   updateChart(): void {
      if (this.highcharts && this.highcharts.chart) {
         this.highcharts.chart('chartContainer', this.chartOptions2);
       }
    }
  /////// column Chart from json server
 chartOptions2:Highcharts.Options  = {   
  chart: {
     type: 'column'
  },
  title: {
     text: 'Monthly Average Rainfall'
  },
  subtitle:{
     text: 'Data from json server' 
  },
  xAxis:{
     categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
     'Aug','Sep','Oct','Nov','Dec'],
     crosshair: true        
  },     
  yAxis : {
     min: 0,
     title: {
        text: 'Rainfall (mm)'         
     }      
  },
  tooltip : {
     headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
     pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
        '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
  },
  plotOptions : {
     column: {
        pointPadding: 0.2,
        borderWidth: 0
     }
  },
  series: []
};
//pie chart from api personnes/getall gouv
fetchgouv(): void {
   this.s.getallgouv().subscribe((data) => {

  ///lezm nehseb total des personnes dans tous les gouv
const totalPersons = data.reduce((acc, gouv) => acc + gouv.personneList.length, 0);

    const seriesData = data.map((gouv) => ({
     
      name: gouv.gouverneratLibelle,
      y: (gouv.personneList.length / totalPersons) * 100,
      data: [gouv.gouverneratLibelle, gouv.personneList.length],
    }));

    this.chartOptionsapi.series = [{
      type: 'pie',
      name: 'Percentage',
      data: seriesData,
    }];
     this.updateChart1();
    //console.log(this.chartOptionsapi.series);
   });
 }
 updateChart1(): void {
    if (this.highcharts && this.highcharts.chart) {
       this.highcharts.chart('chartContainerapi', this.chartOptionsapi);
     }
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

 //pie chart 3D
  chartOptions1 : Highcharts.Options = {   
    chart : {
      options3d: {
         enabled: true,
         alpha: 45,
         beta: 0
      },
       plotShadow: false
    },
    title : {
       text: 'Browser market shares at a specific website, 2014'   
    },
    tooltip : {
       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         depth: 35,
         dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            style: {
               color:
               'black'
            }
         }
      }
    },
    series : [{
       type: 'pie',
       name: 'Browser share',
       data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
          {
             name: 'Chrome',
             y: 12.8,
             sliced: true,
             selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',      0.7]
       ]
    }]
 };

//line chart
chartOptions3:Highcharts.Options = {   
  chart: {
     type: "spline"
  },
  title: {
     text: "Monthly Average Temperature"
  },
  subtitle: {
     text: "Source: WorldClimate.com"
  },
  xAxis:{
     categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  },
  yAxis: {          
     title:{
        text:"Temperature °C"
     } 
  },
  tooltip: {
     valueSuffix:" °C"
  },
  series: [{
    type:'line',
     name: 'Tokyo',
     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
  },
  {type:'line',
     name: 'New York',
     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
  },
  {type:'line',
     name: 'Berlin',
     data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
  },
  {type:'line',
     name: 'London',
     data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
  }]
};


///bar chart
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar'  
    },
    title: {
      text: 'Monthly Average Temperature'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
   
    
    yAxis :{
      title: {
         text: 'Wind speed (m/s)'
      },
      min: 0,
      minorGridLineWidth: 0,
      gridLineWidth: 0,
      //alternateGridColor: null,
      plotBands: [
         { // Light air
            from: 0.3,
            to: 1.5,
            color: 'rgba(68, 170, 213, 0.1)',
            
            label: {
               text: 'Light air',
               style: {
                  color: '#606060'
               }
            }
         }, 
         { // Light breeze
            from: 1.5,
            to: 3.3,
            color: 'rgba(0, 0, 0, 0)',
            
            label: {
               text: 'Light breeze',
               style: {
                  color: '#606060'
               }
            }
         }, 
         { // Gentle breeze
            from: 3.3,
            to: 5.5,
            color: 'rgba(68, 170, 213, 0.1)',
            
            label: {
               text: 'Gentle breeze',
               style: {
                  color: '#606060'
               }   
            }
         }, 
         { // Moderate breeze
            from: 5.5,
            to: 8,
            color: 'rgba(0, 0, 0, 0)',
            
            label: {
               text: 'Moderate breeze',
               style: {
                  color: '#606060'
               }
            }
         }, 
         { // Fresh breeze
            from: 8,
            to: 11,
            color: 'rgba(68, 170, 213, 0.1)',
            
            label: {
               text: 'Fresh breeze',
               style: {
                  color: '#606060'
               }
            }
         }, 
         { // Strong breeze
            from: 11,
            to: 14,
            color: 'rgba(0, 0, 0, 0)',
            
            label: {
               text: 'Strong breeze',
               style: {
                  color: '#606060'
               }
            }   
         }, 
         { // High wind
            from: 14,
            to: 15,
            color: 'rgba(68, 170, 213, 0.1)',
            
            label: {
               text: 'High wind',
               style: {
                  color: '#606060'
               }
            }
         }
      ]
   },
    tooltip: {
      valueSuffix: ' °C'
    },
    series: [
      {
        name: 'Tokyo',
        type: 'bar',  
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {
        name: 'New York',
        type: 'bar',  
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
      },
      {
        name: 'Berlin',
        type: 'bar',  
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      },
      {
        name: 'London',
        type: 'bar',  
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }
    ]
  };
//scatter char
  chartOptions6 :Highcharts.Options= {         
   chart: {
      type: 'scatter',
      
    },
    title : {
      text: 'Scatter plot'   
   },
   
    series: [ {
      type: 'scatter',
      data: [
        ]
    },
      {
        type: 'scatter',
        data: [
          [4, 4],
          [5, 5],
          [6, 6]
        ]
      }, {
         type: 'scatter',
         data: [
           [7, 7],
           [8, 8],
           [9, 9]
         ]
       },
       {
         type: 'scatter',
         data: [
           [2, 7],
           [5, 8],
           [1, 3]
         ]
       }
    ]
  };
  
///dynamic chart
chartOptions7:Highcharts.Options = {         
   chart : {
      type: 'spline',
     // animation: Highcharts, // don't animate in IE < IE 10.
      marginRight: 10,
      events: {
         load: function () {
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
               var x = (new Date()).getTime(), // current time
               y = Math.random();
               series.addPoint([x, y], true, true);
            }, 1000);
         }
      }
   },
   title : {
      text: 'Live random data'   
   },   
   subtitle:{text:'Fetched data from backend'},  
   xAxis : {
      type: 'datetime',
      tickPixelInterval: 150
   },
   yAxis : {
      title: {
         text: 'Value'
      },
      plotLines: [{
         value: 0,
         width: 1,
         color: '#808080'
      }]
   },
   tooltip: {
      formatter: function () {
         return '<b>' + this.series.name + '</b><br/>' +
         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', (new Date()).getTime()) + '<br/>' +
         Highcharts.numberFormat(Math.random(), 2);
      }
   },
   plotOptions: {
      area: {
         pointStart: 1940,
         marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
               hover: {
                  enabled: true
               }
            }
         }
      }
   },
   legend: {
      enabled: false
   },
   exporting : {
      enabled: false
   },
   series : [{
      type:'spline',
      name: 'Random data',
      data: (function () {
         // generate an array of random data
         var data = [],time = (new Date()).getTime(),i;
         for (i = -19; i <= 0; i += 1) {
            data.push({
               x: time + i * 1000,
               y: Math.random()
            });
         }
         return data;
      }())    
   }]
};
////////combination
chartOptions8:Highcharts.Options = {               
   title : {
      text: 'Combination chart'   
   },   subtitle:{text:'Fetched data from backend'},  
   xAxis : {
      categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
   },
   
   series : [
      {
         type: 'column',
         name: 'Jane',
         data: [3, 2, 1, 3, 4]
      }, 
      {
         type: 'column',
         name: 'John',
         data: [2, 3, 5, 7, 6]
      }, 
      {
         type: 'column',
         name: 'Joe',
         data: [4, 3, 3, 9, 0]
      }, 
      {
         type: 'spline',
         name: 'Average',
         data: [3, 2.67, 8, 6.33, 3.33]
      },
      {
         type: 'pie',
         name: 'Total consumption',
         data: [
            {
               name: 'Jane',
               y: 13,
               color: '#808080' 
            }, 
            {
               name: 'John',
               y: 23,
               color: '#78965'            }, 
            {
               name: 'Joe',
               y: 19,
               color:'#562163' 
            }
         ],
         center: [100, 80],
         size: 100,
         showInLegend: false,
         dataLabels: {
            enabled: false
         }            
      }, 
   ]
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

 fetchgouvapi2(): void {
   this.s.getallgouv().subscribe((data) => {
 
     const totalPersons = data.reduce((acc, gouv) => acc + gouv.personneList.length, 0);
 
    
     const categories = data.map((gouv) => gouv.gouverneratLibelle);
     const seriesData = data.map((gouv) => (gouv.personneList.length / totalPersons) * 100);
 
     
    
     this.chartOptionsapi2.xAxis={categories};
   
     this.chartOptionsapi2.series = [{
       type: 'areaspline',
       name: 'Percentage of persons',
       data: seriesData
     }];
 //console.log(categories)
     this.updateChartapi2();
   });
 }
 updateChartapi2(): void {
   if (this.highcharts && this.highcharts.chart) {
      this.highcharts.chart('chartContainerapi2', this.chartOptionsapi2);
    }
 }
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
  fetchgouvapi3(): void {
   this.s.getallgouv().subscribe((data) => {
     const totalPersons = data.reduce((acc, gouv) => acc + gouv.personneList.length, 0);
     const categories = data.map((gouv) => gouv.gouverneratLibelle);
     this.chartOptionsapi3.xAxis={categories};

     const seriesData = data.map((gouv) => ({
       x: parseFloat(gouv.gouverneratLibelle),
       y: (gouv.personneList.length / totalPersons) * 100
     }));
 
     this.chartOptionsapi3.series = [{
      type:'scatter',
       name: 'Percentage of persons',
       data: seriesData
     }];
 
     this.updateChartapi3();
   });
 }
 
 updateChartapi3(): void {
   if (this.highcharts && this.highcharts.chart) {
      this.highcharts.chart('chartContainerapi3', this.chartOptionsapi3);
    }
 }
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
 
 fetchgouvapi4(): void {
   this.s.getallgouv().subscribe((data) => {
     const totalPersons = data.reduce((acc, gouv) => acc + gouv.personneList.length, 0);
 
     const categories = data.map((gouv) => gouv.gouverneratLibelle);
     this.chartOptionsapi4.xAxis= {categories};
 
     const seriesData = data.map((gouv) => ({
       name: gouv.gouverneratLibelle,
       y: (gouv.personneList.length / totalPersons) * 100,
       persons: gouv.personneList.length 
     }));
 
     this.chartOptionsapi4.series = [{
       type: 'column',
       name: 'Percentage of persons',
       data: seriesData.map(item => ({
         y: item.y,
         persons: item.persons
       }))
     }];
 
     this.updateChartapi4();
   });
 }
 
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
 fetchgouvapi5(): void {
   this.s.getallgouv().subscribe((data) => {

     const categories = data.map((gouv) => gouv.gouverneratLibelle);
     this.chartOptionsapi5.xAxis={categories};

 
    const seriesData = data.map((gouv) => ({
    name: gouv.gouverneratLibelle,
   y:gouv.personneList.length 
 }));

    
     this.chartOptionsapi5.series = [{
      type:'spline',
       name: 'Number of persons',
       data: seriesData, color: '#EF881B'
     }];
 
     this.updateChartapi5();
   });
 }
 updateChartapi5(): void {
   if (this.highcharts && this.highcharts.chart) {
      this.highcharts.chart('chartContainerapi5', this.chartOptionsapi5);
    }
 }
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
 fetchgouvapi6(): void {
   this.s.getallgouv().subscribe((data) => {

     const categories = data.map((gouv) => gouv.gouverneratLibelle);
     this.chartOptionsapi6.xAxis={categories};

 
    const seriesData = data.map((gouv) => ({
    name: gouv.gouverneratLibelle,
   y:gouv.personneList.length 
 }));

    
     this.chartOptionsapi6.series = [{
      type:'bar',
       name: 'Number of persons',
       data: seriesData, color: '#07E83A'
     }];
 
     this.updateChartapi6();
   });
 }
 updateChartapi6(): void {
   if (this.highcharts && this.highcharts.chart) {
      this.highcharts.chart('chartContainerapi6', this.chartOptionsapi6);
    }
 }
 chartOptionssss:Highcharts.Options = {      
   chart: {
      type: 'column',
      margin: 75,
      options3d: {
         enabled: true,
         alpha: 10,
         beta: 20,
         depth: 50,
         viewDistance: 25,
      }
   },         
   title : {
      text: 'Chart rotation demo'   
   },
   plotOptions : {
      column: {
         depth: 25, colorByPoint: true 
      }
   },
   series: [{
      type: 'column',
      data: [
        { y: 29.9, color: '#0000ff' },
        { y: 71.5, color: '#ff00ff' },
        { y: 106.4, color: '#0000ff' },
        { y: 129.2, color: '#ff00ff' },
        { y: 144.0, color: '#0000ff' },
        { y: 176.0, color: '#ff00ff' },
        { y: 135.6, color: '#0000ff' },
        { y: 148.5, color: '#ff00ff' },
        { y: 216.4, color: '#0000ff' },
        { y: 194.1, color: '#ff00ff' },
        { y: 95.6, color: '#0000ff' },
        { y: 54.4, color: '#ff00ff' }
      ]
    }]
};


////////////////////////

   chartOptionsnew:Highcharts.Options =  {   
      chart : {
         
         plotShadow: false
      },
      title : {
         text: 'Browser market shares at a specific website, 2014'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            shadow: false,
            center: ['50%', '50%'],
            size:'45%',
            innerSize: '20%'            
         }
      },
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
               name: 'Chrome',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['Others',      0.7]
         ]
      }]
   };

   chartOptionsnew2:Highcharts.Options = {   
      chart: {
         type: 'area',
         spacingBottom: 30
      },
      title: {
         text: 'Fruit consumption *'
      },
      subtitle : {
         text: '* Jane\'s banana consumption is unknown',
         floating: true,
         align: 'right',
         verticalAlign: 'bottom',
         y: 15
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 150,
         y: 100,
         floating: true,
         borderWidth: 1,
         backgroundColor: 
           '#FFFFFF'
      },
      xAxis:{
         categories: ['Apples', 'Pears', 'Oranges', 'Bananas', 'Grapes', 'Plums', 'Strawberries', 'Raspberries']
      },
      yAxis : {
         title: {
            text: 'Y-Axis'
         },
        
      },
      tooltip : {
         formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
               this.x + ': ' + this.y;
         }
      },
      plotOptions : {
         area: {
            fillOpacity: 0.5 
         }
      },
      credits:{
         enabled: false
      },
      series: [
         {type: 'area',
            name: 'John',
            data: [0, 1, 4, 4, 5, 2, 3, 7]
         }, 
         {type: 'area',
            name: 'Jane',
            data: [1, 0, 3, null, 3, 1, 2, 1]
         }
      ]
   };
   hartOptionsnew3:Highcharts.Options = {         
      chart : {
         type: 'scatter',
         margin: [70, 50, 60, 80], 
         marginRight: 10,
         events: {
            click: function (e) {
            
              var x = e.layerX.valueOf
              var y = e.layerY.valueOf

              var series = this.series[0];
              
              series.addPoint([x, y]);
           }
        }
      },
      title : {
         text: 'User supplied data'   
      },   
      subtitle : {
         text: 'Click the plot area to add a point. Click a point to remove it.'
      },
      xAxis : {
         gridLineWidth: 1,
         minPadding: 0.2,
         maxPadding: 0.2,
         
      },
      yAxis : {
         title: {
            text: 'Value'
         },
         minPadding: 0.2,
         maxPadding: 0.2,
         
         plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
         }]
      },
      plotOptions: {
         series: {
            lineWidth: 1,
            point: {
               events: {
                  'click': function () {
                     if (this.series.data.length > 1) {
                        this.remove();
                     }
                  }
               }
            }
         }
      },
      legend: {
         enabled: false
      },
      exporting : {
         enabled: false
      },
      series : [{
         type:'scatter',
         data: [[20, 20], [80, 80]]
      }]
   };
   chartOptionsnew4:Highcharts.Options = {         
      chart : {
         
      },
      title : {
         text: 'Source: WorldClimate.com'   
      },   
      subtitle : {
         text: 'Average Monthly Temperature and Rainfall in Tokyo'
      },
      xAxis : {
         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         crosshair: true
      },
      yAxis : [
         { // Primary yAxis
            labels: {
               format: '{value}\xB0C',
               style: {
                  color: '#E905F8'
               }
            },
            title: {
               text: 'Temperature',
               style: {
                  color: '#054BF8'
               }
            },
            opposite: true
         }, 
         { // Secondary yAxis
            title: {
               text: 'Rainfall',
               style: {
                  color: '#009D4C'
               }
            },
            labels: {
               format: '{value} mm',
               style: {
                  color: '#9D0045'
               }
            }
         },
         { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
               text: 'Sea-Level Pressure',
               style: {
                  color:'#02E8F3'
               }
            },
            labels: {
               format: '{value} mb',
               style: {
                  color: '#9E1404'
               }
            },
            opposite:true  
         }
      ],
      tooltip: {
         shared: true
      },
      legend: {
         enabled:false
      },
      series : [
         {
            name: 'Rainfall',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
                    216.4, 194.1, 95.6, 54.4],
            tooltip: {
               valueSuffix: ' mm'
            }
         }, 
         {
            name: 'Sea-Level Pressure',
            type: 'spline',
            yAxis: 2,
            data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2,
                     1013.1, 1016.9, 1018.2, 1016.7],
            marker: {
               enabled: false
            },
            //ShortDot: 'shortdot',
            tooltip: {
               valueSuffix: ' mb'
            }
         },
         {
            name: 'Temperature',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
               valueSuffix: '\xB0C'
            }
         }
      ]
   };
   chartOptionsnew5:Highcharts.Options = {         
      chart : {
         type: 'spline'      
      }, 
      title : {
         text: 'Wind speed during two days'   
      },
      subtitle : {
         text: 'October 6th and 7th 2009 at two locations in Vik i Sogn, Norway'
      },
      xAxis : {
         type: 'datetime',
         labels: {
            overflow: 'justify'
         }
      },
      yAxis : {
         title: {
            text: 'Wind speed (m/s)'
         },
         min: 0,
         minorGridLineWidth: 0,
         gridLineWidth: 0,
         //alternateGridColor: null,
         plotBands: [
            { // Light air
               from: 0.3,
               to: 1.5,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                  text: 'Light air',
                  style: {
                     color: '#606060'
                  }
               }
            }, 
            { // Light breeze
               from: 1.5,
               to: 3.3,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                  text: 'Light breeze',
                  style: {
                     color: '#606060'
                  }
               }
            }, 
            { // Gentle breeze
               from: 3.3,
               to: 5.5,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                  text: 'Gentle breeze',
                  style: {
                     color: '#606060'
                  }   
               }
            }, 
            { // Moderate breeze
               from: 5.5,
               to: 8,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                  text: 'Moderate breeze',
                  style: {
                     color: '#606060'
                  }
               }
            }, 
            { // Fresh breeze
               from: 8,
               to: 11,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                  text: 'Fresh breeze',
                  style: {
                     color: '#606060'
                  }
               }
            }, 
            { // Strong breeze
               from: 11,
               to: 14,
               color: 'rgba(0, 0, 0, 0)',
               label: {
                  text: 'Strong breeze',
                  style: {
                     color: '#606060'
                  }
               }   
            }, 
            { // High wind
               from: 14,
               to: 15,
               color: 'rgba(68, 170, 213, 0.1)',
               label: {
                  text: 'High wind',
                  style: {
                     color: '#606060'
                  }
               }
            }
         ]
      },
      tooltip : {
         valueSuffix: ' m/s'
      },
      plotOptions : {
         spline: {
            lineWidth: 4,
            states: {
               hover: {
                  lineWidth: 5
               }
            },
            marker: {
               enabled: false
            },
            pointInterval: 3600000, // one hour
            pointStart: Date.UTC(2009, 9, 6, 0, 0, 0)
         }
      },
      series : [
         {type: 'spline'   ,
            name: 'Vik i Sogn',      
            data: [4.3, 5.1, 4.3, 5.2, 5.4, 4.7, 3.5, 4.1, 5.6, 7.4, 6.9, 7.1,
               7.9, 7.9, 7.5, 6.7, 7.7, 7.7, 7.4, 7.0, 7.1, 5.8, 5.9, 7.4,
               8.2, 8.5, 9.4, 8.1, 10.9, 10.4, 10.9, 12.4, 12.1, 9.5, 7.5,
               7.1, 7.5, 8.1, 6.8, 3.4, 2.1, 1.9, 2.8, 2.9, 1.3, 4.4, 4.2,
               3.0, 3.0]
         }, 
         {type: 'spline'   ,
            name: 'Norway',
            data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.3, 0.0,
               0.0, 0.4, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
               0.0, 0.6, 1.2, 1.7, 0.7, 2.9, 4.1, 2.6, 3.7, 3.9, 1.7, 2.3,
               3.0, 3.3, 4.8, 5.0, 4.8, 5.0, 3.2, 2.0, 0.9, 0.4, 0.3, 0.5, 0.4]
         }
      ],     
      navigation : {
         menuItemStyle: {
            fontSize: '10px'
         }
      }    
   };
  
   chartOptionsnew6 :Highcharts.Options= {   
      chart: {
         type: "spline"
      },
      title: {
         text: "Monthly Average Temperature"
      },
      subtitle: {
         text: "Source: WorldClimate.com"
      },
      xAxis:{
         categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yAxis: {          
         title:{
            text:"Temperature °C"
         } 
      },
      plotOptions: {
         series: {
            dataLabels: {
               enabled: true
            }
         }
      },
      tooltip: {
         valueSuffix:" °C"
      },
      series: [{type: "spline",
         name: 'Tokyo',
         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,26.5, 23.3, 18.3, 13.9, 9.6]
      },
      {type: "spline",
         name: 'New York',
         data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,24.1, 20.1, 14.1, 8.6, 2.5]
      },
      {type: "spline",
         name: 'Berlin',
         data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
      },
      {type: "spline",
         name: 'London',
         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }]
   };
   chartOptionsnew7:Highcharts.Options = {   
      chart: {
         type: "area"
      },
      title: {
        text: 'Historic and Estimated Worldwide Population Growth by Region'
      },
      subtitle : {
        text: 'Source: Wikipedia.org'
      },
      xAxis:{
        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        tickmarkPlacement: 'on',
        
      },
      yAxis : {
        title: {
           text: 'Billions'
        },
       
      },
      tooltip : {
        shared: true,
        valueSuffix: ' millions'
      },
      plotOptions : {
        area: {
           stacking: 'percent',
           lineColor: '#666666',
           lineWidth: 1,
           
           marker: {
              lineWidth: 1,
              lineColor: '#666666'
           }
        }
      },
      credits:{
        enabled: false
      },
      series: [
         {type: "area",
            name: 'Asia',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
         }, 
         {type: "area",
            name: 'Africa',
            data: [106, 107, 111, 133, 221, 767, 1766]
         }, 
         {type: "area",
            name: 'Europe',
            data: [163, 203, 276, 408, 547, 729, 628]
         }, 
         {type: "area",
            name: 'America',
            data: [18, 31, 54, 156, 339, 818, 1201]
         }, 
         {type: "area",
            name: 'Oceania',
            data: [2, 2, 2, 6, 13, 30, 46]
         }
      ]
   };
   chartOptionsnew8 :Highcharts.Options = {   
      chart: {
         type: 'bar'
      },
      title: {
         text: 'Bar chart with negative values'
      },
      xAxis:{
         categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']        
      },     
      series: [
         {type: 'bar',
            name: 'John',
            data: [5, 3, 4, 7, 2]
         }, 
         {type: 'bar',
            name: 'Jane',
            data: [2, -2, -3, 2, 1]
         }, 
         {type: 'bar',
            name: 'Joe',
            data: [3, 4, 4, -2, 5]
         }
      ]
   };
   chartOptionsnew9 :Highcharts.Options= {   
      chart: {
        type: 'area',
        inverted: true
      },
      title: {
        text: 'Average fruit consumption during one week'
      },
      subtitle : {
         style: {
            position: 'absolute',
            right: '0px',
            bottom: '10px'
         }
      },
      legend : {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: -150,
         y: 100,
         floating: true,
         borderWidth: 1,
         backgroundColor: 
  
               '#FFFFFF'
      },
      xAxis:{
         categories: ['Monday','Tuesday','Wednesday','Thursday',
            'Friday','Saturday','Sunday'] 
      },
      yAxis : {
         title: {
            text: 'Number of units'
         },
         
         min:0
      },
      tooltip : {
         formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
               this.x + ': ' + this.y;
         }
      },
      plotOptions : {
         area: {
            fillOpacity: 0.5 
         }
      },
      credits:{
         enabled: false
      },
      series: [
         { type: 'area',
            name: 'John',
            data: [3, 4, 3, 5, 4, 10, 12]
         }, 
         { type: 'area',
            name: 'Jane',
            data: [1, 3, 4, 3, 3, 5, 4]
         }
      ]
   };
}

