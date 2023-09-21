import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResultBE } from '../models/result-be.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiLink = environment.apiUrl;
  private resourceEndPoint = this.apiLink + 'users';

  constructor(private http: HttpClient) { }
  getAll(page: number, perPage: number): Observable<ResultBE<User>> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('per_page', perPage);

    return this.http.get<ResultBE<User>>(this.resourceEndPoint, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'body',
      params: params
    }).pipe(
      map((res: any) => {
        let users: User[] = [];
        res.data.forEach((item: any) => {
          let usr = {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            avatar: item.avatar
          }
          users.push(usr);
        })
        return {
          page: res.page,
          per_page: res.per_page,
          total: res.total,
          total_pages: res.total_pages,
          data: users
        }
      })
    )
  }


  getById(id: number): Observable<User> {
    let params = new HttpParams();
    params = params.append('id', id)
    return this.http.get<User>(this.resourceEndPoint, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'body',
      responseType: 'json',
      params: params
    }).pipe(
      map((res: any) => {
        let user: User = {
          id: res.data.id,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          avatar: res.data.avatar
        }
        return user;
      })
    )
  }


  create(user: User): Observable<User> {
    return this.http.post<User>(this.resourceEndPoint, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'body'
    })
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.resourceEndPoint + '/' + user.id, user).pipe(
      map((res: any) => {
        let x: User = {
          id: res.id,
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
          avatar: res.avatar
        }
        return x;
      })
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceEndPoint}/${id}`);
  }
}
