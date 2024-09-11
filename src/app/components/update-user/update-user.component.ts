import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnChanges {
  @Input() selectedUser!: User;
  @Output() userUpdated: EventEmitter<void> = new EventEmitter<void>();
  updateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: AuthService) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', [Validators.required]]
    });
  }

  // Méthode appelée lorsque l'utilisateur sélectionné change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && this.selectedUser) {
      this.updateForm.patchValue({
        name: this.selectedUser.name,
        email: this.selectedUser.email,
        role: this.selectedUser.role
      });
    }
  }

  // Soumettre le formulaire de mise à jour
  onSubmit(): void {
    if (this.updateForm.invalid) {
      return;
    }

    const updatedData = this.updateForm.value;
    this.userService.updateUser(this.selectedUser.id, updatedData).subscribe({
      next: (response) => {
        console.log('Utilisateur mis à jour avec succès', response);

        // Fermer le modal après la mise à jour
        const modalElement = document.getElementById('UpdateModal');
        if (modalElement) {
          const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }

        // Émettre un événement pour informer le parent que l'utilisateur a été mis à jour
        this.userUpdated.emit();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour', error);
      }
    });
  }
}
