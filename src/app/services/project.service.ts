import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  // Récupérer un projet et ses milestones par ID
  getProjectById(projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${projectId}`);
  }

  // Récupérer tous les projets
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  // Créer un nouveau projet
  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project);
  }

  // Mettre à jour un projet existant
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }

  // Supprimer un projet
  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

    sendReminder(projectId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/${projectId}/reminder`, {});
    }


}
