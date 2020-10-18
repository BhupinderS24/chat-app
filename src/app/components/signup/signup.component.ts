import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  googleAuth() {
    this.authService.GoogleAuth();
  }

  signUp(email, password) {
    this.authService.SignUp(email, password);
  }

  signInClickHandler() {
    this.router.navigateByUrl('auth/sign-in');
  }
}
