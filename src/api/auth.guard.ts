import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.userService.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const exp = decoded.exp * 1000; // timestamp en ms
        if (Date.now() < exp) {
          return true;
        }
      } catch (e) {
        console.error('Token invalide', e);
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}