import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { take } from 'rxjs/operators';
import { DataService } from '../../common/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-chats',
  templateUrl: './active-chats.component.html',
  styleUrls: ['./active-chats.component.css'],
})
export class ActiveChatsComponent implements OnInit {
  adminUser: any;
  allUsers: any[] = [];
  users: any[] = [];
  chatIds: any = [];
  recentChatInfo = {};
  isChatExist = false;
  messages = [];
  chatId: string;

  constructor(
    public af: AngularFireDatabase,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminUser = JSON.parse(localStorage.getItem('user'));

    // this.af.list(`users/${this.adminUser}`).valueChanges().subscribe((data:any)=>{

    // })

    this.af
      .list(`users`)
      .valueChanges()
      .subscribe((user: any) => {
        console.log('USERRRRRRRRRRRR', user);
        this.allUsers = user;

        this.af
          .list(`users/${this.adminUser.uid}/userChats`)
          .valueChanges()
          .subscribe((data: any) => {
            console.log('UserChats', data);
            this.users = [];

            for (let chatUser of data) {
              for (let user of this.allUsers) {
                console.log(chatUser.userId, user.uid);
                if (chatUser.userId === user.uid) {
                  let chat = {};
                  this.af
                    .object(`chats/${chatUser.chatId}`)
                    .valueChanges()
                    .subscribe((chatInfo: any) => {
                      console.log('CHATINFO', chatInfo);
                      chat = { ...chatInfo };

                      const fullInfo = { ...user, ...chat };

                      for (let i in this.users) {
                        if (this.users[i].uid == fullInfo.uid) {
                          this.users[i] = fullInfo;
                          console.log('USER', user);
                          console.log('USERSSSSS', this.users);
                          return;
                        }
                      }
                      this.users.push(fullInfo);

                      console.log('USERSSSSS', this.users);
                    });
                }
              }
            }

            // recentChatInfo

            // this.users = [];
            // for (let user of data) {
            //   if (user.uid !== this.adminUser.uid) {
            //     this.users.push(user);
            //   }
            // }
          });
      });
  }

  memberClicked(user) {
    this.dataService.changeData(user);
    console.log('USER', user);

    // console.log('MEMBER', member);
    // this.user = { ...member };

    this.adminUser = JSON.parse(localStorage.getItem('user'));

    // const chatsRef = this.af.list(`chats`);

    // chatsRef.valueChanges().subscribe((data) => {
    //   console.log('CHATS', data);
    // });

    let arr = [];

    const chatsRef = this.af
      .list(`users/${this.adminUser.uid}/userChats`)
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: any[]) => {
        console.log('DATAAAAA', data);

        console.log(user.uid);
        arr = data.filter((curr, i, arr) => curr.userId === user.uid);
        console.log('CHATEISTARR', arr);

        this.chatId = arr[0].chatId;

        // this.dataService.changeChatId(this.chatId);

        this.router.navigateByUrl(`/dashboard/chats/${this.chatId}`);

        // const messages = this.af.list(`chatsMessages/${this.chatId}`);

        // messages
        //   .valueChanges()
        //   .pipe(take(1))
        //   .subscribe((messages) => {
        //     console.log('messages', messages);
        //     this.messages = messages;

        //     const messageId = this.af.object(
        //       `chats/${this.chatId}/${this.adminUser.uid}`
        //     );

        //     messageId
        //       .valueChanges()
        //       .pipe(take(1))
        //       .subscribe((data: any) => {
        //         messageId.update({
        //           unReadCount: 0,
        //         });
        //       });
      });
  }

  displayCurrentTime(time) {
    var date = new Date(time);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
    let hoursInString = hours < 10 ? '0' + hours : hours;
    var minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    //var seconds =
    //date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return hoursInString + ':' + minutes + ' ' + am_pm;
  }
}
