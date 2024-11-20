import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken'); // Adjust this as per your auth logic

  if (token) {
    return true; // Allow access if a valid token is present
  } else {
    router.navigate(['/login']); // Redirect to login page if no token
    return false; // Block access
  }
};
