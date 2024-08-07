import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Personne } from './models/personne';
import { Gouvernerat } from './models/gouvernerat';
import { Tooltip } from 'highcharts';
import { Etudiant } from './models/Etudiant';


interface City {
  type:any,
  name: string;
  data: number[];
}

interface DataItem<T> {
  name: string;
  value: T;
}

interface ChartData {
  categories: string[];
  series: any[];

  //tooltip: any[]; 
  //plotOptions: any[];
}

@Injectable({
  providedIn: 'root'
})

export class PersonnechartsService {

  constructor(private http: HttpClient) { }
  ///// lel json server
  private apiUrl = 'http://localhost:3000/cities';
//private salesapi='http://localhost:8088/api/sales/getsales'
private salesapi='http://localhost:8088/api/sales/getallentities'

 getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
  /////////////////

  getallsales(): Observable<any[]> {
    return this.http.get<any[]>(this.salesapi);
  }
////////////////::
  private baseUrl = 'http://localhost:8088/Personnes'; 


  getPersonne(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${this.baseUrl}/getpersonnes`);
  } 
  getallgouv(): Observable<Gouvernerat[]> {
    return this.http.get<Gouvernerat[]>(`${this.baseUrl}/getallgouv`);
  }

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`http://localhost:8088/Etudiants/getEtudiants`);
  }
 
  ///// partie du service pour le traitement des données
  processData<T>(data: any [], chartType: string, transformFn: (item: DataItem<T>) => any): ChartData {
    const transformedData = data.map(transformFn);
    console.log("this",transformedData);
    return this.generateChartData(transformedData, chartType);

  }

  private generateChartData<T>(data: any[], chartType: string): ChartData {

    const categories = data.map(item => item.name);
    let series = [];
     

    switch(chartType) {
      case 'pie':
        series = [{
          type: 'pie',
          data:  data.map(item => ({ name: item.name, y: item.value }))
        }]
       ;
        break;
      case 'bar':
        series = [{
          type: 'bar',
          data: data.map(item => item.value)
        }]
       ;
        break;
      case 'line':
        series = [{
          type: 'line',
          data: data.map(item => item.value)
        }]
        break;
      default:
        throw new Error('Unsupported chart type');
    }

    return { categories, series};
  } 
}

