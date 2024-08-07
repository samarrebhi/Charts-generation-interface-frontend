import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Personne } from './models/personne';
import { Gouvernerat } from './models/gouvernerat';


@Injectable({
  providedIn: 'root'
})

export class PersonnechartsService {

  constructor(private http: HttpClient) { }
 


 
  /////////////////
//private salesapi='http://localhost:8088/api/sales/getsales'
private salesapi='http://localhost:8088/api/sales/getallentities'
  getallsales(): Observable<any[]> {
    return this.http.get<any[]>(this.salesapi);
  }
  private queryapi='http://localhost:8088/api/sales/executeSql'
  executeQuery(sqlQuery: string) {
    return this.http.post<any[]>(this.queryapi, sqlQuery);
  }
////////////////::
  private baseUrl = 'http://localhost:8088/Personnes'; 

  getPersonne(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${this.baseUrl}/getpersonnes`);
  } 
  getallgouv(): Observable<Gouvernerat[]> {
    return this.http.get<Gouvernerat[]>(`${this.baseUrl}/getallgouv`);
  }
/////////////////////////////
  
 
  

  
}

