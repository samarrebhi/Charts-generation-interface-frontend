import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule
    , MatCardModule, 
    MatButtonModule, MatFormFieldModule, 
    MatRadioModule, MatSelectModule, 
    MatInputModule,MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
loginForm: any;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.authService.storeAuthToken(this.username, this.password);
        this.router.navigate(['/charts']); // Redirect after login
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
      },
    });
  }
}
