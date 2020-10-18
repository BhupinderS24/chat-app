import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logIn(userName, userPassword) {
    this.authService.SignIn(userName, userPassword);
  }

  logInWithGoogle() {
    this.authService.GoogleAuth();
  }

  signUpClickHandler() {
    this.router.navigateByUrl('auth/register-user');
  }
}
