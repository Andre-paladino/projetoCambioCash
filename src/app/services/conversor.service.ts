import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {
  private apiUrl = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,ARS-BRL,GBP-BRL,CNY-BRL';
  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
}
}
