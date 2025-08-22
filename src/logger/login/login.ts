import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    console.log("👉 onSubmit() called");
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.userService.login(username, password).subscribe({
        next: (res) => {
          console.log("📩 Backend response:", res);
          if (res.success) {
            this.userService.saveToken(res.token); // démarre le timer 3h
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error("Backend error:", err);
          this.errorMessage = err.error?.message || 'Nom d’utilisateur ou mot de passe incorrect';
        }
      });
    } else {
      console.warn("Formulaire invalide:", this.loginForm.value);
      this.errorMessage = "Veuillez remplir correctement tous les champs.";
    }
  }
}