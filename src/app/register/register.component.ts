import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Assuming AuthService handles API requests
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule
    , MatCardModule, RouterModule,
    MatButtonModule, MatFormFieldModule, 
    MatRadioModule, MatSelectModule, 
    MatInputModule,MatDialogModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMessage = 'Les mots de passe ne correspondent pas.';
        return;
      }

      this.authService.signup(username, password).subscribe(
        response => {
          alert('Inscription réussie!');
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = 'Erreur d\'inscription, veuillez réessayer.';
        }
      );
    }
  }
}
