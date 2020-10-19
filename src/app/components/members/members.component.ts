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
  users: any[];

  ngOnInit(): void {
    // db: AngularFireDatabase
    this.af
      .list('users')
      .valueChanges()
      .subscribe((data) => {
        console.log(data);
        this.users = [...data];
      });

    console.log(this.tutorials);
  }

  memberClicked(user) {
    this.dataService.changeData(user);
    console.log(user);
  }
}
