import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, concatMap, exhaustMap, from, mergeMap } from 'rxjs';
import { ResultBE } from '../../models/result-be.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommuncationService } from 'src/app/shared/serivces/communcation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];
  subscription!: Subscription;
  isLoading: boolean = false;
  page: number = 1;
  perPage: number = 4
  totalPages: number = 2;
  isAlert: boolean = false;
  checkedItems: boolean[] = [];
  id: number = 0;
  serachSubject: Subject<string> = new Subject<string>();
  searchResult: User;


  constructor(private userSerivces: UserService, private communicate: CommuncationService) { }

  ngOnInit(): void {
    this.getUsers(this.page);
    this.serachSubject.pipe(
      exhaustMap((value: any) => {
        return this.userSerivces.getById(value)
      })
    ).subscribe(
      res => {
        console.log('exhaustMap-Serach Result', res);
      },
      error => {
        console.error('exhaustMap-Serach Error', error);
      }
    )
  }

  getUsers(page: number) {
    this.isLoading = true;
    this.subscription = this.userSerivces.getAll(page, this.perPage).subscribe(
      (res: ResultBE<User>) => {
        let resultBE: ResultBE<User> = res;
        this.users = resultBE.data;
        this.page = resultBE.page;
        this.totalPages = resultBE.total_pages;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
  }

  goToPreviousPage(): void {
    this.getUsers(this.page - 1);
  }
  goToNextPage(): void {
    this.getUsers(this.page + 1);
  }
  goToPage(page: number): void {
    this.getUsers(page);
  }
  getArrayOfPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onDelete(id: number): void {
    this.userSerivces.delete(id).subscribe((res) => {
      this.users = this.users.filter(user => user.id !== id);
    })
    this.isAlert = true;
  }
  closeAlert() {
    this.isAlert = false;
  }
  toggelCheckedAll(value: boolean): void {
    this.checkedItems = Array.from(new Array(this.users.length).keys(), (item) => value);
  }
  toggelCheckedBox(value: boolean, index: number) {
    this.checkedItems[index] = value;
  }

  deleteSelectedUsers(): void {
    var checkedIds: number[] = [];
    this.checkedItems.forEach((value, index) => {
      if (value) {
        checkedIds.push(this.users[index].id);
      }
    });
    console.log('ids', checkedIds);
    var obs = from(checkedIds);
    obs.pipe(
      concatMap((value) => {
        return this.userSerivces.delete(value)
      })
    ).subscribe(
      (res) => {
        console.log(`user #${res.id} deleted.`, res);
      },
      (error) => {
        console.error('error', error);
      }
    )
  }

  getDetails(id: number): void {
    this.userSerivces.getById(id).subscribe(
      (res) => {
        this.communicate.sendData(res);
        console.log('detailes', res);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  onSerachChange(value: string): void {

    console.log('value', value);
    this.userSerivces.getById(+value).subscribe(
      res => {
        console.log('Serach', res);
        this.searchResult = res;
      },
      error => {
        console.log('Serach Error', error);
      }
    )
    this.serachSubject.next(value);
  }

}

