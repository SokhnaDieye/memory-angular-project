import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import {Client} from "../../models/Client.model";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[] = []; // Liste des clients
  newClientForm!: FormGroup;

  constructor(
      private clientService: ClientService,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadClients(); // Charger les clients à l'initialisation

    // Initialiser le formulaire d'ajout de client avec validation
    this.newClientForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      contact_phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // Charger les clients depuis le service
  loadClients() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  // Ouvrir le modal d'ajout de client
  openClientModal() {
    const modal = document.getElementById('clientModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  // Fermer le modal d'ajout de client
  closeClientModal() {
    const modal = document.getElementById('clientModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Soumettre le formulaire pour ajouter un nouveau client
  onSubmit() {
    if (this.newClientForm.invalid) {
      return;
    }

    const newClient = this.newClientForm.value;

    this.clientService.createClient(newClient).subscribe(response => {
      console.log('Client ajouté avec succès !', response);

      // Fermer le modal
      this.closeClientModal();

      // Rafraîchir la liste des clients
      this.loadClients();

      // Réinitialiser le formulaire
      this.newClientForm.reset();
    });
  }
}
