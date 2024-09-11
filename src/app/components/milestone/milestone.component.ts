import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MilestoneService } from '../../services/milestone.service';
import { ProjectService } from '../../services/project.service';
import { Milestone } from '../../models/milestone.models';
import { Project } from 'src/app/models/produit.model';


@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.css']
})
export class MilestoneComponent implements OnInit {
  milestones: Milestone[] = []; // Liste des milestones
  projects: Project[] = []; // Liste des projets
  newMilestoneForm!: FormGroup;
  selectedMilestone: Milestone | null = null; // Milestone sélectionné pour modification

  constructor(
      private milestoneService: MilestoneService,
      private projectService: ProjectService, // Ajoutez le service des projets
      private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadMilestones(); // Charger les milestones à l'initialisation
    this.loadProjects(); // Charger les projets à l'initialisation

    // Initialiser le formulaire d'ajout de milestone avec validation
    this.newMilestoneForm = this.formBuilder.group({
      name: ['', Validators.required],
      project_id: ['', Validators.required],
      date_echeance: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  // Charger les milestones depuis le service
  loadMilestones() {
    this.milestoneService.getMilestones().subscribe(milestones => {
      this.milestones = milestones;
    });
  }

  // Charger les projets depuis le service
  loadProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  // Ouvrir le modal d'ajout de milestone
  openMilestoneModal(milestone?: Milestone) {
    if (milestone) {
      this.selectedMilestone = milestone;
      this.newMilestoneForm.patchValue(milestone);
    } else {
      this.selectedMilestone = null;
      this.newMilestoneForm.reset();
    }

    const modal = document.getElementById('milestoneModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  // Fermer le modal d'ajout de milestone
  closeMilestoneModal() {
    const modal = document.getElementById('milestoneModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Soumettre le formulaire pour ajouter un nouveau milestone
  onSubmit() {
    if (this.newMilestoneForm.invalid) {
      return;
    }

    const newMilestone = this.newMilestoneForm.value;

    this.milestoneService.createMilestone(newMilestone).subscribe(response => {
      console.log('Milestone ajouté avec succès !', response);

      // Fermer le modal
      this.closeMilestoneModal();

      // Rafraîchir la liste des milestones
      this.loadMilestones();

      // Réinitialiser le formulaire
      this.newMilestoneForm.reset();
    });
  }

  // Mettre à jour un milestone existant
  onUpdate() {
    if (this.selectedMilestone && this.newMilestoneForm.valid) {
      const updatedMilestone = { ...this.selectedMilestone, ...this.newMilestoneForm.value };

      this.milestoneService.updateMilestone(updatedMilestone.id, updatedMilestone).subscribe(response => {
        console.log('Milestone mis à jour avec succès !', response);

        // Fermer le modal
        this.closeMilestoneModal();

        // Rafraîchir la liste des milestones
        this.loadMilestones();

        // Réinitialiser le formulaire
        this.newMilestoneForm.reset();
        this.selectedMilestone = null;
      });
    }
  }

  // Supprimer un milestone
  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce milestone ?')) {
      this.milestoneService.deleteMilestone(id).subscribe(() => {
        console.log('Milestone supprimé avec succès !');
        this.loadMilestones();
      });
    }
  }
}
