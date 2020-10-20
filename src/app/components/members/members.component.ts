import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { DataService } from '../../common/services/data.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  constructor(
    public af: AngularFireDatabase,
    private dataService: DataService
  ) {}

  tutorials: Observable<any[]>;
  users: any[] = [];
  adminUser: any;

  ngOnInit(): void {
    // db: AngularFireDatabase

    this.adminUser = JSON.parse(localStorage.getItem('user'));
    this.af
      .list('users')
      .valueChanges()
      .subscribe((data: any) => {
        console.log(data);
        this.users = [];
        for (let user of data) {
          if (user.uid !== this.adminUser.uid) {
            this.users.push(user);
          }
        }
      });

    console.log(this.tutorials);
  }

  memberClicked(user) {
    this.dataService.changeData(user);
    console.log(user);
  }
}
