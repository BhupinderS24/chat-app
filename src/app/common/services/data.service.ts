import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private messageSource = new BehaviorSubject('');
  currentData = this.messageSource.asObservable();

  changeData(message: any) {
    this.messageSource.next(message);
  }
}
