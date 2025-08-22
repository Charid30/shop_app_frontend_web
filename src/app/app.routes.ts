import { Routes } from '@angular/router';
import { Navbar } from '../logger/navbar/navbar';
import { LoginComponent } from '../logger/login/login';
import { Footer } from '../logger/footer/footer';
import { Dashboard } from '../pages/dashboard/dashboard';
import { AuthGuard } from '../api/auth.guard';

export const routes: Routes = [
  { path: 'navbar', component: Navbar },
  { path: 'footer', component: Footer },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // <-- sans '/'
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // <-- toujours en dernier
];