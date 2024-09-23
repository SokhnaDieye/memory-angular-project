import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {User} from "../../models/user.model";
import {filter} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  users: User[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private cdRef: ChangeDetectorRef) {
    this.loadUsers();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const user = this.registerForm.value;
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.closeUserModal();
        location.reload();
        this.loadUsers();
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'inscription';
        console.error('Erreur lors de l\'inscription', error);
      }
    });
  }

  closeUserModal() {
    const modal = document.getElementById('registerModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}
