import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}
  onSubmit() {
    // Exemple de logique de connexion (à remplacer par ton service d'authentification)
    if (this.email === 'test@example.com' && this.password === 'password123') {
      // Connexion réussie
      this.router.navigate(['/dashboard']);
    } else {
      // Affiche un message d'erreur
      this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
    }
  }
}
