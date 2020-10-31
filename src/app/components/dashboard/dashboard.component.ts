import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { AuthService } from '../../common/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public af: AngularFireDatabase,
    public authService: AuthService
  ) {}

  adminUser: any;
  showDetail = false;

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));

      this.af
        .object(`users/${user.uid}`)
        .valueChanges()
        .pipe(take(1))
        .subscribe((userInfo: any) => {
          this.adminUser = userInfo;
          this.showDetail = true;
        });

      // const tutRef = this.af.object(`userChats/${user.uid}`);
      // tutRef.update({ chatIds: [] });
    }
    this.beforeUnload();
  }

  beforeUnload() {
    window.onbeforeunload = () => {
      // const user = JSON.parse(localStorage.getItem('user'));

      this.af
        .object(`users/${this.adminUser.uid}`)
        .update({ lastSeen: new Date(), online: false });

      // if (this.websocketStatus === OPENSTATUS) {
      //   this.websocketService.closeConnection();
      // }
    };
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '380px',
      data: {
        message: 'message',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  navigateTable() {
    this.router.navigateByUrl('/table');
  }

  showToastrSuccess() {
    this.toastr.success('message', 'success', {
      timeOut: 2000,
    });
  }

  showToastrError() {
    this.toastr.error('message', 'error', {
      timeOut: 3000,
    });
  }

  showSpinner() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
