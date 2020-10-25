import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private memberSource = new BehaviorSubject('');
  currentMember = this.memberSource.asObservable();

  changeData(member: any) {
    this.memberSource.next(member);
  }

  private messageSource = new BehaviorSubject([]);
  currentMessages = this.messageSource.asObservable();

  changeMessages(messages: any[]) {
    this.messageSource.next(messages);
  }

  private chatIdSource = new BehaviorSubject('');
  currentChatId = this.chatIdSource.asObservable();

  changeChatId(chatId) {
    this.chatIdSource.next(chatId);
  }
}
