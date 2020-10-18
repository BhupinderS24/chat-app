import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';

import { SignupComponent } from '../signup/signup.component';
import { EmailComponent } from '../email/email.component';
import { VerifyEmailComponent } from '../verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'register-user', component: SignupComponent },
      { path: 'sign-in', component: EmailComponent },
      { path: 'verify-email-address', component: VerifyEmailComponent },
    ],
  },

  {
    path: '',
    redirectTo: 'auth/register-user',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
