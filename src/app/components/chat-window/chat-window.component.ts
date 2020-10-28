import { Component, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { MembersComponent } from '../members/members.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService,
    private af: AngularFireDatabase,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  user: any;
  message: string;
  adminUser: any;
  messages: any[] = [];
  chatId: any = '';
  isChatExist = false;
  showUI = false;
  userId = '';
  subscription1$: Subscription;
  subscription2$: Subscription;
  invitation: false;
  sentBy: '';
  blockedUser = [];
  blockedBy = [];

  ngOnInit(): void {
    this.route.params
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev.chatId === curr.chatId;
        })
      )
      .subscribe((params) => {
        this.adminUser = JSON.parse(localStorage.getItem('user'));
        this.chatId = params.chatId;

        if (this.subscription1$ != undefined) {
          this.subscription1$.unsubscribe();
        }

        if (this.subscription2$ != undefined) {
          this.subscription2$.unsubscribe();
        }

        const messageId2 = this.af.object(`chats/${this.chatId}`);

        this.subscription2$ = messageId2
          .valueChanges()
          .subscribe((data: any) => {
            if (data.invitation !== undefined) {
              this.invitation = data.invitation;
            }

            if (data.lastMessageSentBy !== undefined) {
              this.sentBy = data.lastMessageSentBy;
            }
          });

        const messageId3 = this.af.object(`chats/${this.chatId}/members`);

        messageId3
          .valueChanges()
          .pipe(take(1))
          .subscribe((members: any[]) => {
            let tempArr = [];
            tempArr = members.filter((el, i, arr) => el !== this.adminUser.uid);

            this.userId = tempArr[0];

            const messageId4 = this.af.object(`users/${this.userId}`);

            messageId4
              .valueChanges()
              .pipe(take(1))
              .subscribe((user) => {
                this.user = user;
              });
          });

        const messages5 = this.af.list(`chatsMessages/${this.chatId}`, (ref) =>
          ref.limitToLast(25)
        );

        this.subscription1$ = messages5.valueChanges().subscribe((messages) => {
          this.messages = messages;
          this.showUI = true;
          // if (this.messages[this.messages.length - 1].chatId === this.chatId) {
          //   this.dataService.changeMessages(messages);
          // }
          const messageId6 = this.af.object(
            `chats/${this.chatId}/${this.adminUser.uid}`
          );

          messageId6
            .valueChanges()
            .pipe(take(1))
            .subscribe((data: any) => {
              messageId6.update({
                unReadCount: 0,
              });
            });
        });

        this.blockedUser = [];
        this.blockedBy = [];
        const messageId4 = this.af.list(`users/${this.adminUser.uid}/blocked`);

        messageId4
          .valueChanges()

          .subscribe((blocked: any[]) => {
            for (let user of blocked) {
              this.blockedUser.push(user.user);
            }
          });

        const messageId5 = this.af.list(
          `users/${this.adminUser.uid}/blockedBy`
        );

        messageId5.valueChanges().subscribe((blocked: any[]) => {
          for (let user of blocked) {
            this.blockedBy.push(user.user);
          }
        });
      });

    // this.dataService.currentMember.subscribe((member: any) => {
    //   this.user = member;
    // });

    // this.dataService.currentMessages.subscribe((data) => {
    //   this.messages = data;
    //   this.showUI = true;
    // });

    // this.dataService.currentChatId.subscribe((chatId) => {
    //   this.chatId = chatId;
    // });

    // this.dataService.currentMember.subscribe((member: any) => {
    //   console.log('MEMBER', member);
    //   this.user = { ...member };

    //   this.adminUser = JSON.parse(localStorage.getItem('user'));

    //   // const chatsRef = this.af.list(`chats`);

    //   // chatsRef.valueChanges().subscribe((data) => {
    //   //   console.log('CHATS', data);
    //   // });

    //   let arr = [];

    //   // if (Object.keys(this.user).length !== 0) {
    //   //   const chatsRef = this.af
    //   //     .list(`users/${this.adminUser.uid}/userChats`)
    //   //     .valueChanges()
    //   //     .pipe(take(1))
    //   //     .subscribe((data: any[]) => {
    //   //       console.log('DATAAAAA', data);

    //   //       console.log(this.user.uid);
    //   //       arr = data.filter((curr, i, arr) => curr.userId === this.user.uid);
    //   //       console.log('CHATEISTARR', arr);

    //   //       if (arr.length === 0) {
    //   //         this.isChatExist = false;
    //   //         this.messages = [];
    //   //       } else {
    //   //         this.isChatExist = true;
    //   //         this.chatId = arr[0].chatId;

    //   //         const messages = this.af.list(`chatsMessages/${this.chatId}`);

    //   //         messages
    //   //           .valueChanges()
    //   //           .pipe(take(1))
    //   //           .subscribe((messages) => {
    //   //             console.log('messages', messages);
    //   //             this.messages = messages;

    //   //             const messageId = this.af.object(
    //   //               `chats/${this.chatId}/${this.adminUser.uid}`
    //   //             );

    //   //             messageId
    //   //               .valueChanges()
    //   //               .pipe(take(1))
    //   //               .subscribe((data: any) => {
    //   //                 messageId.update({
    //   //                   unReadCount: 0,
    //   //                 });
    //   //               });
    //   //           });

    //   //         const messages2 = this.af.list(
    //   //           `chatsMessages/${this.chatId}`,
    //   //           (ref) => ref.limitToLast(1)
    //   //         );

    //   //         messages2
    //   //           .valueChanges()

    //   //           .subscribe((messages) => {
    //   //             console.log('messages', messages);
    //   //             this.messages = messages;

    //   //             const messageId = this.af.object(
    //   //               `chats/${this.chatId}/${this.adminUser.uid}`
    //   //             );

    //   //             messageId
    //   //               .valueChanges()
    //   //               .pipe(take(1))
    //   //               .subscribe((data: any) => {
    //   //                 messageId.update({
    //   //                   unReadCount: 0,
    //   //                 });
    //   //               });

    //   //             // for (let message of this.messages) {
    //   //             //   if (
    //   //             //     message.sentBy !== this.adminUser.uid &&
    //   //             //     message.read === false
    //   //             //   ) {
    //   //             //     message.read = true;

    //   //             //     const messageId = this.af.object(
    //   //             //       `chats/${this.chatId}/${this.adminUser.uid}`
    //   //             //     );
    //   //             //     let unReadCount;
    //   //             //     messageId
    //   //             //       .valueChanges()
    //   //             //       .pipe(take(1))
    //   //             //       .subscribe((data: any) => {
    //   //             //         unReadCount = data.unReadCount;

    //   //             //         messageId.update({
    //   //             //           unReadCount: unReadCount - 1,
    //   //             //         });
    //   //             //       });
    //   //             //   }
    //   //             // }
    //   //           });
    //   //       }
    //   //     });
    //   // }
    // });
  }

  sendMessage() {
    // const messageId6 = this.af.object(
    //   `users/${this.userId}/${this.adminUser.uid}`
    // );
    // if (this.chatId == '') {
    //   let arr = [];
    //   console.log('ARR', arr.length);
    //   const messageId = this.af.list(`chats`);
    //   let adminUserId = this.adminUser.uid;
    //   let userId = this.user.uid;

    //   const key = messageId.push({
    //     members: [this.adminUser.uid, this.user.uid],
    //
    //     // lastMessageSentBy: this.adminUser.uid,
    //     // lastMessageTime: new Date().toString(),
    //     // lastMessageKey: messageKey,
    //     // lastMessage: this.message,
    //   }).key;

    //   this.chatId = key;

    //   const messageId2 = this.af.object(`chats/${this.chatId}`);
    //   let tempObj = {};
    //   tempObj[userId] = { unReadCount: 0 };

    //   messageId2.update(tempObj);

    //   let tempObj2 = {};
    //   tempObj2[adminUserId] = { unReadCount: 0 };

    //   // const messageId2 = this.af.object(`chats/${this.chatId}/${adminUserId}`);

    //   messageId2.update(tempObj2);

    //   console.log(key);

    //   const userChats = this.af.list(`users/${this.adminUser.uid}/userChats`);
    //   userChats.push({ userId: this.user.uid, chatId: key });

    //   const userChats2 = this.af.list(`users/${this.user.uid}/userChats`);

    //   userChats2.push({ userId: this.adminUser.uid, chatId: key });

    //   const chatmessageId = this.af.list(`chatsMessages`);
    // }

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
    const messageKey = this.af.list(`chatsMessages/${this.chatId}`).push({
      sentBy: this.adminUser.uid,
      message: this.message,
      sent: true,
      time: new Date().toString(),
      chatId: this.chatId,
      read: false,
    }).key;

    // console.log('LastSeen', this.user.lastSeen);

    const messageId = this.af.object(`chats/${this.chatId}/${this.userId}`);

    const chatInfo = this.af.object(`chats/${this.chatId}`);
    let unReadCount;
    messageId
      .valueChanges()
      .pipe(take(1))
      .subscribe((data: any) => {
        unReadCount = data.unReadCount;

        messageId.update({
          unReadCount: unReadCount + 1,
        });

        // const messageId2 = this.af.object(`chats/${this.chatId}`);

        chatInfo.update({
          lastMessageSentBy: this.adminUser.uid,
          lastMessageTime: new Date().toString(),
          lastMessageKey: messageKey,
          lastMessage: this.message,
        });
      });
  }

  getTime(time) {
    return this.displayCurrentTime(time);
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

  onAccept() {
    const chatInfo = this.af.object(`chats/${this.chatId}`);

    chatInfo.update({ invitation: false });
  }

  onRemove() {
    const tutorialsRef = this.af.list(`users/${this.adminUser.uid}/blocked`);
    tutorialsRef.push({ user: this.user.uid });

    const tutorialsRef2 = this.af.list(`users/${this.userId}/blockedBy`);
    tutorialsRef2.push({ user: this.adminUser.uid });

    const chatInfo = this.af.object(`chats/${this.chatId}`);

    chatInfo.update({ invitation: false });

    // const tutorialsRef2 = this.af.list('chatMessages');
    // tutorialsRef2.remove(this.chatId);
  }
}
