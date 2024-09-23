import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {ClientService} from "../../services/client.service";
import {Milestone} from "../../models/milestone.models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MilestoneService} from "../../services/milestone.service";
import {forkJoin} from "rxjs";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  project: any = {};
  milestones: any[] = [];
  clientName: string = ''; // Stocker le nom du client
  newMilestoneForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private projectService: ProjectService,
      private clientService: ClientService,
      private router: Router,
      private milestoneService: MilestoneService,
  ) { }

  ngOnInit(): void {
    // Initialiser le formulaire d'ajout de milestone avec validation
    this.newMilestoneForm = this.fb.group({
      name: ['', Validators.required],
      project_id: [''],
      date_echeance: ['', Validators.required],
      status: ['', Validators.required],
      montant_facture: ['', Validators.required]
    });
    this.initNewMilestoneForm(); // Initialiser le formulaire
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
        montant_facture: '',
        date_echeance: '',
        status: '',
        project_id: this.project.id
      });
  }
  quitter(){
    this.router.navigate(['/listproject']);
  }

  // Initialiser le FormGroup pour le nouveau milestone
  initNewMilestoneForm() {
    this.newMilestoneForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      montant_facture: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  // Supprimer un milestone
  removeMilestone(milestone: any) {
    const index = this.milestones.indexOf(milestone);
    if (index !== -1) {
      this.milestones.splice(index, 1);
    }
  }
  /*sauvegarde() {
    const lastMilestone = this.milestones[this.milestones.length - 1]; // Récupérer le dernier milestone

    // Vérifier que le dernier milestone est valide
    if (lastMilestone && lastMilestone.name && lastMilestone.description && lastMilestone.montant_facture && lastMilestone.date_echeance && lastMilestone.status) {
      lastMilestone.project_id = this.project.id; // Assurez-vous d'ajouter l'ID du projet

      // Sauvegarder le dernier milestone
      this.milestoneService.createMilestone(lastMilestone).subscribe(
        response => {
          console.log('Milestone ajouté avec succès !', response);
          this.milestones[this.milestones.length - 1] = response; // Mettre à jour le dernier milestone

          // Optionnel : Récupérer tous les milestones pour avoir les données les plus à jour
          this.loadMilestones();
        },
        error => {
          console.error('Error saving milestone:', error);
        }
      );
    } else {
      console.error('Le dernier milestone n\'est pas valide à sauvegarder');
    }
  }*/

  sauvegarde() {
    const lastMilestone = this.milestones[this.milestones.length - 1]; // Récupérer le dernier milestone

    // Vérifier que le dernier milestone est valide
    if (lastMilestone && lastMilestone.name && lastMilestone.description && lastMilestone.montant_facture && lastMilestone.date_echeance && lastMilestone.status) {
      lastMilestone.project_id = this.project.id; // Assurez-vous d'ajouter l'ID du projet

      // Sauvegarder le dernier milestone
      this.milestoneService.createMilestone(lastMilestone).subscribe(
        response => {
          console.log('Milestone ajouté avec succès !', response);
          this.milestones[this.milestones.length - 1] = response; // Mettre à jour le dernier milestone

          // Notification de succès avec SweetAlert
          Swal.fire({
            title: 'Succès!',
            text: 'Le milestone a été sauvegardé avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          // Optionnel : Récupérer tous les milestones pour avoir les données les plus à jour
          this.loadMilestones();
        },
        error => {
          console.error('Erreur lors de la sauvegarde du milestone:', error);

          // Notification d'erreur avec SweetAlert
          Swal.fire({
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de la sauvegarde du milestone.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.error('Le dernier milestone n\'est pas valide à sauvegarder');

      // Notification d'erreur si le dernier milestone n'est pas valide
      Swal.fire({
        title: 'Erreur!',
        text: 'Les informations du dernier milestone sont incomplètes.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }


  loadMilestones() {
    const projectId = this.project.id; // Assurez-vous que vous avez l'ID du projet
    this.projectService.getProjectById(projectId).subscribe((data: any) => {
      this.milestones = data.milestones || []; // Mettre à jour la liste des milestones
    }, error => {
      console.error('Error fetching milestones:', error);
    });
  }



}
