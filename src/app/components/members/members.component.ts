import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { DataService } from '../../common/services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  constructor(
    public af: AngularFireDatabase,
    private dataService: DataService,
    private router: Router
  ) {}

  tutorials: Observable<any[]>;
  users: any[] = [];
  adminUser: any;
  allUser: any[];

  ngOnInit(): void {
    // db: AngularFireDatabase

    this.adminUser = JSON.parse(localStorage.getItem('user'));
    this.af
      .list('users')
      .valueChanges()
      .subscribe((data: any) => {
        this.users = [];
        this.allUser = data;

        this.af
          .list(`users/${this.adminUser.uid}/userChats`)
          .valueChanges()
          .subscribe((data: any) => {
            this.users = [];

            let userIds = [];
            for (let userChats of data) {
              userIds.push(userChats.userId);
            }

            this.users = this.allUser.filter(
              (user) =>
                !userIds.includes(user.uid) && user.uid !== this.adminUser.uid
            );
          });
      });
  }

  memberClicked(user) {
    this.router.navigateByUrl(`/dashboard/invite/${user.uid}`);
    // this.dataService.changeData(user);

    // this.dataService.changeChatId('');

    // this.dataService.changeMessages([]);
  }
}
