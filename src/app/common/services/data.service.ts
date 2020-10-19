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
}
