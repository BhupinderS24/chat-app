import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  constructor() {}

  private userSource = new BehaviorSubject({});
  currentUser = this.userSource.asObservable();

  changeUserDetail(userDetail) {
    this.userSource.next(userDetail);
  }
}
