import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  // Récupérer tous les paiements
  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payments`);
  }

  // Créer un nouveau paiement
  createPayment(payment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments`, payment);
  }
}
