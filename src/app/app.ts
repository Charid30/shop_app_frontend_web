import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "../logger/footer/footer";
import { Navbar } from "../logger/navbar/navbar";
import { UserService } from '../services/user.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, CommonModule, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  isAuthenticated = signal(false);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isAuthenticated.set(status);
    });
  }
}
