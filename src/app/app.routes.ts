import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.gaurd';
import { LoginComponent } from './login/login.component';
import { GenerationinterfaceComponent } from './generationinterface/generationinterface.component';
import { RegisterComponent } from './register/register.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full', 
  },
  {
    path: 'charts',
    component: GenerationinterfaceComponent,
   canActivate: [authGuard], 
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {path: 'register', component: RegisterComponent }
];
