import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, client);
  }
  // Méthode pour obtenir le client via son ID
  getClientById(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${clientId}`);
  }

}
