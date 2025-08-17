import { Routes } from '@angular/router';
import { Navbar } from '../logger/navbar/navbar';
import { Footer } from '../logger/footer/footer';
import { Login } from '../logger/login/login';

export const routes: Routes = [
    {   path: 'navbar',
        component: Navbar
    },
    {
        path: 'footer',
        component: Footer
    },
    {
        path: 'login',
        component: Login
    }
];
