import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../common/services/auth.service';

import { GoogleService } from '../../common/services/google.service';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService, GoogleService],
})
export class AuthModule {}
