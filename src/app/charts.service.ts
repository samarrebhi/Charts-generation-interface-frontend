import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class PersonnechartsService {

  constructor(private http: HttpClient) { }
 
// change fetched data api from here

 // private salesapi='http://localhost:8088/Personnes/getallentities'
private salesapi='http://localhost:8088/api/sales/getallentities'

  getallsales(): Observable<any[]> {
    return this.http.get<any[]>(this.salesapi);
  }
// change fetching data through sql query api from here

//private queryapi='http://localhost:8088/api/Personnes/executeSql'
  private queryapi='http://localhost:8088/api/sales/executeSql'

  executeQuery(sqlQuery: string) {
    return this.http.post<any[]>(this.queryapi, sqlQuery);
  }

  
 
  

  
}

