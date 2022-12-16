import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  url = '';

  constructor(private http: HttpClient) { }

  register(userData: any){
    return this.http.post<any>(this.url, userData);
  }



}
