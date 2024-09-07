import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient,private router: Router) {}
  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('authToken', token);  // Stocker le token dans le localStorage
        }
      })
    );
  }

  getUsers(): Observable<any> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }
    register(user: { name: string, email: string, password: string, password_confirmation: string, role: string }): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${this.apiUrl}/register`, user, { headers }).pipe(
            tap(response => {
                const token = response.token;
                if (token) {
                    localStorage.setItem('authToken', token);
                }
            })
        );
    }

  // Fonction pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');  // Vérifie si le token est présent
  }


}
