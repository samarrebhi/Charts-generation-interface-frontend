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
   
    
    yAxis: {
      title: {
        text: 'Temperature °C'
      }
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
         data: [3, 2.67, 3, 6.33, 3.33]
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
        { y: 29.9, color: '#ff0000' },
        { y: 71.5, color: '#00ff00' },
        { y: 106.4, color: '#0000ff' },
        { y: 129.2, color: '#ff00ff' },
        { y: 144.0, color: '#ffff00' },
        { y: 176.0, color: '#00ffff' },
        { y: 135.6, color: '#ff9900' },
        { y: 148.5, color: '#9900ff' },
        { y: 216.4, color: '#0099ff' },
        { y: 194.1, color: '#ff0099' },
        { y: 95.6, color: '#99ff00' },
        { y: 54.4, color: '#00ff99' }
      ]
    }]
};
} 