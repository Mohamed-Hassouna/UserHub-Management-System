import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommuncationService {
  SubjectData: Subject<any> = new Subject<any>;
  DataObservable: Observable<any> = this.SubjectData.asObservable();

  constructor() { }

  sendData(user:User): void {
    this.SubjectData.next(user);
  }
  getListener(): Observable<any> {
    return this.DataObservable;
  }
}
