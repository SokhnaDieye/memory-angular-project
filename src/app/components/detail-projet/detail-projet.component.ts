import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  project: any = {};
  milestones: any[] = [];
  clientName: string = ''; // Stocker le nom du client

  constructor(
      private route: ActivatedRoute,
      private projectService: ProjectService,
      private clientService: ClientService,
      private router: Router,
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID du projet depuis l'URL
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      const numericProjectId = parseInt(projectId, 10);
      if (isNaN(numericProjectId)) {
        console.error('Invalid project ID');
        return;
      }

      // Récupérer les détails du projet
      this.projectService.getProjectById(numericProjectId).subscribe((data: any) => {
        console.log('API Response:', data); // Vérifiez toute la réponse
        this.project = data; // Utilisez directement `data` si ce sont les données du projet
        this.milestones = data.milestones || [];

        // Vérifiez l'ID du client et les données du client
       if (this.project.client_id) {
          this.clientService.getClientById(this.project.client_id).subscribe((clientData: any) => {
            console.log('Client API Response:', clientData); // Vérifiez les données du client
            this.clientName = clientData.name;
          }, error => {
            console.error('Error fetching client data:', error);
          });
       }else {
          console.error('Client ID not found in project data');
        }
      }, error => {
        console.error('Error fetching project data:', error);
      });
    } else {
      console.error('Project ID is null or invalid');
    }
  }

  // Ajouter un nouveau milestone vide
  addMilestone() {
    this.milestones.push({
      name: '',
      description: '',
      status: ''
    });
  }
  quitter(){
    this.router.navigate(['/listproject']);
  }

  // Supprimer un milestone
  removeMilestone(milestone: any) {
    const index = this.milestones.indexOf(milestone);
    if (index !== -1) {
      this.milestones.splice(index, 1);
    }
  }
}
