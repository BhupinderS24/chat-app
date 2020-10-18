import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';
import { GoogleService } from '../../common/services/google.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public googleService: GoogleService
  ) {}

  ngOnInit(): void {
    this.googleService.currentUser.subscribe((user) => {
      if (user) {
        this.showData = true;
      }
    });
  }

  showData = false;

  sendVerification() {
    // this.authService.SendVerificationMail();
  }
}
