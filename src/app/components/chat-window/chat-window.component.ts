import { Component, OnInit } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';

import { take } from 'rxjs/operators';
import { MembersComponent } from '../members/members.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private af: AngularFireDatabase
  ) {}
  user: any;
  message: string;
  adminUser: any;

  ngOnInit(): void {
    this.dataService.currentMember.subscribe((member: any) => {
      console.log(member);
      this.user = { ...member };
    });

    this.adminUser = JSON.parse(localStorage.getItem('user'));

    // const chatsRef = this.af.list(`chats`);

    // chatsRef.valueChanges().subscribe((data) => {
    //   console.log('CHATS', data);
    // });
  }

  sendMessage() {
    this.checkIfChatExists();

    /***UsedCode***/
    // const messageId = this.af.list(`chats`);

    // const key = messageId.push({ members: [this.adminUser.uid, this.user.uid] })
    //   .key;

    // console.log(key);

    // const userChats = this.af.list(`users/${this.adminUser.uid}/userChats`);

    // userChats.push({ userId: this.user.uid, chatId: key });

    // const chatmessageId = this.af.list(`chatsMessages`);

    // this.af
    //   .list(`chatsMessages/${key}`)
    //   .push({ sentBy: this.adminUser.uid, message: 'message' });

    /*****************/

    // chatmessageId.set(
    //   key,
    //   this.af
    //     .list(`chatsMessages/${key}`)
    //     .push({ sentBy: this.adminUser.uid, message: 'message' })
    // );
    // .push({ sentBy: this.adminUser.uid, message: 'message' });

    // const chatUniqueId = '_' + Math.random().toString(36).substr(2, 9);
    // const messageUniqueId = '_' + Math.random().toString(36).substr(2, 9);
    // const messageId = this.af.object(
    //   `chatMessages/${chatUniqueId}/${messageUniqueId}`
    // );
    // const messageObj: any = {
    //   message: this.message,
    //   messageDateTime: new Date(),
    //   sentBy: this.adminUser.uid,
    // };
    // messageId.set(messageObj);
    // const userchatIdsRef = this.af.object(`users/${this.adminUser.uid}`);
    // userchatIdsRef.update({ chatIds: [chatUniqueId] });
    // const chatIdsRef = this.af.object(`Chats/${chatUniqueId}`);
    // const chatObj = {
    //   lastMessageSent: this.message,
    //   members: [this.adminUser.uid, this.user.uid],
    // };
    // chatIdsRef.set(chatObj);
  }

  checkIfChatExists() {
    let arr = [];
    const chatsRef = this.af
      .list(`users/${this.adminUser.uid}/userChats`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: any[]) => {
        console.log('DATAAAAA', data);
        arr = data.filter((curr, i, arr) => curr.userId === this.user.uid);
        console.log('CHATEISTARR', arr);

        if (arr.length === 0) {
          const messageId = this.af.list(`chats`);

          const key = messageId.push({
            members: [this.adminUser.uid, this.user.uid],
          }).key;

          console.log(key);

          const userChats = this.af.list(
            `users/${this.adminUser.uid}/userChats`
          );

          userChats.push({ userId: this.user.uid, chatId: key });

          const chatmessageId = this.af.list(`chatsMessages`);

          this.af
            .list(`chatsMessages/${key}`)
            .push({ sentBy: this.adminUser.uid, message: this.message });
        } else {
          arr[0].chatId;

          const chatmessageId = this.af.list(`chatsMessages`);

          this.af
            .list(`chatsMessages/${arr[0].chatId}`)
            .push({ sentBy: this.adminUser.uid, message: this.message });
        }
      });
  }
}
