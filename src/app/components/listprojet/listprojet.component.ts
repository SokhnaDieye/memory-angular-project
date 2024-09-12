import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listprojet',
  templateUrl: './listprojet.component.html',
  styleUrls: ['./listprojet.component.css']
})
export class ListprojetComponent implements OnInit{

  projects: any[] = [];

  constructor(private router: Router,private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }
  openProjectDetails(projectId: number) {
    this.router.navigate(['/detailsProjet', projectId]);
  }
 /* getProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }*/
  getProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;

      const today = new Date();

      // Parcourir chaque projet pour vérifier la date de fin
      this.projects.forEach(project => {
        const endDate = new Date(project.end_date);

        if (endDate <= today && project.status === 'En cours') {
          project.status = 'Termine';
          this.updateProjectStatus(project);
        }
      });
    });
  }
  updateProjectStatus(project: any): void {
    this.projectService.updateProject(project.id, project).subscribe((response) => {
      console.log('Statut du projet mis à jour avec succès', response);
    }, (error) => {
      console.error('Erreur lors de la mise à jour du statut du projet', error);
    });
  }

}
