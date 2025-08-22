import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'] // <-- correction ici
})
export class Navbar implements OnInit {
  isLoggedIn: boolean = false;
  menuOpen: boolean = false;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.userService.logout();
  }

  getUsername(): string {
    const token = this.userService.getToken();
    if (!token) return '';
    try {
      const decoded: any = jwtDecode(token);
      return decoded.username_admin || '';
    } catch (e) {
      console.error('Erreur lors du décodage du token', e);
      return '';
    }
  }

  getRole(): string {
    const token = this.userService.getToken();
    if (!token) return '';
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || '';
    } catch (e) {
      console.error('Erreur lors du décodage du token', e);
      return '';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}
