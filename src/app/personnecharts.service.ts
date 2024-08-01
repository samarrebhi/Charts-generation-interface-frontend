import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { Personne } from './models/personne';
import { Gouvernerat } from './models/gouvernerat';


interface City {
  type:any,
  name: string;
  data: number[];
}

@Injectable({
  providedIn: 'root'
})

export class PersonnechartsService {

  constructor(private http: HttpClient) { }
  ///// lel json server
  private apiUrl = 'http://localhost:3000/cities';

 getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
  
////////////////::
  private baseUrl = 'http://localhost:8088/Personnes'; 


  getPersonne(): Observable<Personne[]> {
    return this.http.get<Personne[]>(`${this.baseUrl}/getpersonnes`);
  } 
  getallgouv(): Observable<Gouvernerat[]> {
    return this.http.get<Gouvernerat[]>(`${this.baseUrl}/getallgouv`);
  }

  
  
}
