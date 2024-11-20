import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8088'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    
    // Log the login data to verify it's correct
    console.log('Login Data:', loginData);
    
    return this.http.post(`${this.baseUrl}/auth/login`, loginData).pipe(
      catchError((error: any) => {
        // Handle errors and log them for debugging
        console.error('Login error:', error);
        throw error; // Rethrow the error after logging it
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('authToken');
  }

  storeAuthToken(username: string, password: string): void {
    const token = btoa(`${username}:${password}`);
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }



   // Register logic
   signup(username: string, password: string): Observable<any> {
    const userData = { username, password };
    return this.http.post(`${this.baseUrl}/auth/signup`, userData);
  }
}
