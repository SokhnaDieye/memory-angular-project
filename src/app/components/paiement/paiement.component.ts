import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {PaiementService} from "../../services/paiement.service";
import {ClientService} from "../../services/client.service";


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit{
  projects: any[] = [];
  paymentData: any = {};
  clientName: string = '';

  constructor(private clientService: ClientService,private router: Router,private paymentService: PaiementService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  // Récupérer les projets terminés
  /*getProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data.filter(project => project.status === 'Termine');
      this.projects.forEach(project => {
        this.projectService.getProjectById(project.id).subscribe((response: any) => {
          const milestones = response.milestones; // Assurez-vous que 'milestones' est bien un tableau dans la réponse de l'API
          if (Array.isArray(milestones)) { // Vérifiez que 'milestones' est un tableau
            project.budget_real = milestones.reduce((sum: number, milestone: any) => {
              return sum + (milestone.montant_facture || 0); // Ajoutez la valeur ou 0 si elle est undefined
            }, 0); // Initialiser à 0
          } else {
            project.budget_real = 0; // Si milestones n'est pas un tableau, fixer à 0
          }
        });
      });
    });
  }*/
  getProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data.filter(project => project.status === 'Termine');
      this.projects.forEach(project => {
        this.projectService.getProjectById(project.id).subscribe((response: any) => {
          const milestones = response.milestones; // Assurez-vous que 'milestones' est bien un tableau dans la réponse de l'API
          if (Array.isArray(milestones)) { // Vérifiez que 'milestones' est un tableau
            project.budget_real = milestones.reduce((sum: number, milestone: any) => {
              return sum + (parseFloat(milestone.montant_facture) || 0); // Conversion en nombre
            }, 0); // Initialiser à 0
          } else {
            project.budget_real = 0; // Si milestones n'est pas un tableau, fixer à 0
          }
        });
      });
    });
  }

  // Ouvrir le modal de paiement

  openPaymentModal(projectId: number): void {
    const selectedProject = this.projects.find(project => project.id === projectId);

    if (selectedProject) {
      this.paymentData.project_id = selectedProject.id;
      this.paymentData.client_id = selectedProject.client_id; // Assurez-vous que l'ID du client est présent

      // Appelez le service client avec l'ID récupéré
      if (this.paymentData.client_id) {
        this.clientService.getClientById(this.paymentData.client_id).subscribe((clientData: any) => {
          console.log('Client API Response:', clientData);
          this.clientName = clientData.name;
        }, error => {
          console.error('Error fetching client data:', error);
        });
      }
    }
  }


  openProjectDetails(projectId: number) {
    this.router.navigate(['/detailsProjet', projectId]);
  }



  submitPayment(): void {
    console.log(this.paymentData); // Afficher les données du formulaire pour debug

    // Vérifier que tous les champs nécessaires sont remplis
    if (
      this.paymentData.project_id &&
      this.paymentData.client_id &&
      this.paymentData.amount_received &&
      this.paymentData.payment_date &&
      this.paymentData.payment_type &&
      this.paymentData.transaction_reference
    ) {
      this.paymentService.createPayment(this.paymentData).subscribe(
        (response) => {
          console.log('Paiement enregistré avec succès', response);

          // Mettre à jour la liste des projets
          this.getProjects();

          // Fermer le modal
          const modalElement = document.getElementById('paymentModal');
          if (modalElement) {
            modalElement.classList.remove('show');
          }
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du paiement', error);
        }
      );
    } else {
      console.error('Les données de paiement sont incomplètes', this.paymentData);
    }
  }

    sendReminder(projectId: number): void {
        const selectedProject = this.projects.find(project => project.id === projectId);

        if (selectedProject) {
            this.projectService.sendReminder(selectedProject.id).subscribe(
                response => {
                    console.log('Relance envoyée avec succès', response);
                    alert('Un email de relance a été envoyé au client.');
                },
                error => {
                    console.error('Erreur lors de l\'envoi de la relance', error);
                }
            );
        } else {
            console.error('Impossible d\'envoyer la relance, projet non trouvé');
        }
    }





}
