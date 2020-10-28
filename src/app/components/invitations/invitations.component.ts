import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css'],
})
export class InvitationsComponent implements OnInit {
  constructor() {}

  adminUser: any;

  ngOnInit(): void {
    this.adminUser = JSON.parse(localStorage.getItem('user'));
  }
}
