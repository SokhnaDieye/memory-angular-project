import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    return true;  // L'utilisateur est authentifié
  } else {
    router.navigate(['/login']);  // Redirection vers la page de connexion
    return false;  // L'utilisateur n'est pas authentifié
  }
};
