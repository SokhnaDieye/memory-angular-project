import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
      role: ['', [Validators.required]]
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

        const modalElement = document.getElementById('registerModal');
        if (modalElement) {
          const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }

        this.router.navigate(['/listeUser']).then(() => {
          window.location.reload();
        });

      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'inscription';
        console.error('Erreur lors de l\'inscription', error);
      }
    });
  }
}
