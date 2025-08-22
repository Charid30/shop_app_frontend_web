import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Remplace par l'URL réelle
  private logoutTimer: any;

  // Stocke l'état d'authentification dans un BehaviorSubject
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // --- Authentification ---
  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username_admin', username);
    body.set('password_admin', password);

    return this.http.post(`${this.apiUrl}/user/authenticate`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true); // Met à jour l'état après login
    this.startAutoLogout(3 * 60 * 60 * 1000); // 3 heures
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp * 1000; // Convertir en millisecondes
      return Date.now() < exp;
    } catch (e) {
      console.error('Token invalide', e);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false); // Met à jour l'état après logout
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.router.navigate(['/login']);
  }

  private startAutoLogout(duration: number) {
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(() => {
      this.logout();
      alert('Votre session a expiré après 3 heures.');
    }, duration);
  }

  // --- Profil utilisateur ---
  getProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) throw new Error('Utilisateur non authentifié');
    return this.http.get(`${this.apiUrl}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.username || null;
    } catch (e) {
      console.error('Token invalide', e);
      return null;
    }
  }

  // --- Gestion utilisateur ---
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}