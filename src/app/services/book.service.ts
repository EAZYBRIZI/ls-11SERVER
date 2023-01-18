import {Injectable} from '@angular/core';
import {IBook} from "../interfaces/book";
import {Observable, of} from "rxjs";
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _currentId: number = 1;

  public books: IBook[] = [];

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {
  }

  public getList(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(environment.apiUrl + 'books');
  }

  public addBook(book: IBook): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'books', JSON.stringify(book));
  }

  public editBook(book: IBook): Observable<any> {
    return this.httpClient.put(environment.apiUrl + 'books', JSON.stringify(book));
  }

  public generateBooks(count: number): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'books/generate/' + count, {});
  }

  public deleteBooks(): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + 'books');
  }
}