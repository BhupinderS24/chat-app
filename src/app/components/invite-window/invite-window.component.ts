import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  selector: 'app-invite-window',
  templateUrl: './invite-window.component.html',
  styleUrls: ['./invite-window.component.css'],
})
export class InviteWindowComponent implements OnInit {
  userId;
  user: any;
  message: any;
  showUI = false;
  adminUser: any;
  chatId: any;
  constructor(private af: AngularFireDatabase, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev.userId === curr.userId;
        })
      )
      .subscribe((params) => {
        this.userId = params.userId;

        const messageId = this.af.object(`users/${this.userId}`);

        messageId
          .valueChanges()
          .pipe(take(1))
          .subscribe((user) => {
            this.user = user;
            this.showUI = true;
          });
      });
  }

  sendMessage(message) {
    this.adminUser = JSON.parse(localStorage.getItem('user'));

    let arr = [];

    const messageId = this.af.list(`chats`);
    let adminUserId = this.adminUser.uid;
    let userId = this.user.uid;

    const key = messageId.push({
      members: [this.adminUser.uid, this.user.uid],
    }).key;

    this.chatId = key;

    const messageKey = this.af.list(`chatsMessages/${this.chatId}`).push({
      sentBy: this.adminUser.uid,
      message: message,
      sent: true,
      time: new Date().toString(),
      chatId: this.chatId,
      read: false,
    }).key;

    const userChats = this.af.list(`users/${this.adminUser.uid}/userChats`);

    userChats.push({ userId: this.userId, chatId: key });

    const userChats2 = this.af.list(`users/${this.userId}/userChats`);
    userChats2.push({ userId: this.adminUser.uid, chatId: key });

    const messageId2 = this.af.object(`chats/${this.chatId}`);

    messageId2.update({
      lastMessageSentBy: this.adminUser.uid,
      lastMessageTime: new Date().toString(),
      lastMessageKey: messageKey,
      lastMessage: message,
      invitation: true,
    });

    const messageId3 = this.af.object(
      `chats/${this.chatId}/${this.adminUser.uid}`
    );

    messageId3.update({
      unReadCount: 0,
    });

    const messageId4 = this.af.object(`chats/${this.chatId}/${this.userId}`);

    messageId4.update({
      unReadCount: 1,
    });
  }
}
