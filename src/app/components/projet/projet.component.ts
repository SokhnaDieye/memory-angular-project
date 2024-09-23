import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from "../../services/client.service";
import { Project } from 'src/app/models/produit.model';
import { Client } from 'src/app/models/Client.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projects: Project[] = [];
  clients: Client[] = []; // Liste des clients existants
  showClientForm = false; // Affichage conditionnel du formulaire d'ajout de client
  newProjectForm!: FormGroup;

  constructor(
      private projectService: ProjectService,
      private clientService: ClientService,
      private formBuilder: FormBuilder,
      private router: Router
  ) {}

  ngOnInit() {
    this.loadProjects(); // Charger les projets
    this.loadClients(); // Charger les clients

    // Initialiser le formulaire avec validation
    this.newProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      client_id: [null, Validators.required], // ID du client sélectionné
      budget_initial: [null, [Validators.required, Validators.min(0)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: ['', Validators.required],
      client_name: [''],
      client_email: [''],
      client_phone: ['']
    });
  }

  // Charger les projets existants
  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  // Charger les clients existants
  loadClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.newProjectForm.invalid) {
      return;
    }

    const newProject = this.newProjectForm.value;

    // Si un nouveau client doit être ajouté
    if (this.showClientForm) {
      const newClient = {
        name: newProject.client_name,
        email: newProject.client_email,
        phone: newProject.client_phone
      };

      // Ajouter le nouveau client avant de créer le projet
      this.clientService.createClient(newClient).subscribe(clientResponse => {
        newProject.client_id = clientResponse.id;

        this.createProject(newProject);
        // Rafraîchir la liste des projets
      });
    } else {
      // Créer directement le projet si aucun nouveau client n'est ajouté
      this.createProject(newProject);
      // Rafraîchir la liste des projets
      this.loadProjects();
      this.router.navigate(['/listproject']);
    }
  }

  createProject(newProject: any) {
    this.projectService.createProject(newProject).subscribe(response => {
      console.log('Projet ajouté avec succès !', response);

      // Fermer le modal
      const modal = document.getElementById('projectModal');
      if (modal) {
        const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      }

      // Rafraîchir la liste des projets
      this.loadProjects();
      this.router.navigate(['/listproject']);

      // Réinitialiser le formulaire
      this.newProjectForm.reset();
      this.showClientForm = false; // Réinitialiser l'affichage du formulaire client
    });
  }
}
