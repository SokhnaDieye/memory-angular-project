import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Milestone} from "../models/milestone.models";

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private apiUrl = `${environment.apiUrl}/milestones`;
  constructor(private http: HttpClient) {}

  // Récupérer tous les milestones
  getMilestones(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.apiUrl);
  }

  // Récupérer un milestone par ID
  getMilestone(id: number): Observable<Milestone> {
    return this.http.get<Milestone>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau milestone
  createMilestone(milestone: Milestone): Observable<Milestone> {
    return this.http.post<Milestone>(this.apiUrl, milestone);
  }

  // Modifier un milestone existant
  updateMilestone(id: number, milestone: Milestone): Observable<Milestone> {
    return this.http.put<Milestone>(`${this.apiUrl}/${id}`, milestone);
  }

  // Supprimer un milestone
  deleteMilestone(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
