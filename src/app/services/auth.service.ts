import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient,private router: Router) {}

  // Se connecter
  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      tap(response => {
        const token = response.token;
          const user = response.user;
          if (token) {
          localStorage.setItem('authToken', token);  // Stocker le token dans le localStorage
          }
          if (user) {
              localStorage.setItem('user', JSON.stringify(user));  // Stocker les infos utilisateur dans le localStorage
          }
      })
    );
  }

  // Liste utulisateur
  getUsers(): Observable<any> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  // Creer Utulisateur
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
    return !!localStorage.getItem('authToken');
  }
  // Delete user
  deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // Update user
   updateUser(id: number, user: Partial<User>): Observable<any> {
        return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

    //  Récupérer le rôle à partir des informations de l'utilisateur connecté
    getUserRole(): string {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.role || '';
    }



}
