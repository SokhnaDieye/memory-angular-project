import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(loginForm: any): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response);
        const role = response.user.role;
        if (role === 'SeniorManager') {
          this.router.navigate(['/acceuil']);
        } else if (role === 'ResponsableTechnique') {
          this.router.navigate(['/acceuil']);
        }else if (role === 'ResponsableFinancier') {
          this.router.navigate(['/acceuil']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la connexion';
        console.error('Erreur lors de la connexion', error);
      }
    });
  }
}
