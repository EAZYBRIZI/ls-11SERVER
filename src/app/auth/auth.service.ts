import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {LoginModel} from "./models/login.model";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ILoginResponse} from "../interfaces/login-response";
import {RegisterModel} from "./models/register.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _accessToken: string | null = null;
  private _userName: string | null = null;

  public get isAuthorized(): boolean {
    return !!this._accessToken;
  }

  public get accessToken(): string | null {
    return this._accessToken;
  }

  public get userName(): string | null {
    return this._userName;
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
  }

  public login(model: LoginModel): Observable<ILoginResponse> {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});

    return this.httpClient.post<ILoginResponse>(environment.apiUrl + 'auth/login', JSON.stringify(model), {
      headers: headers
    })
      .pipe(
        tap( result => {
          this._accessToken = result.accessToken;
          this.parseUserName();
          this.router.navigate([ 'main' ]);
        }, _ => {
          this._accessToken = null;
          this._userName = null;
        })
      );
  }

  public signup(model: RegisterModel): Observable<any> {
    let headers = new HttpHeaders({['Content-Type']: 'application/json'});

    return this.httpClient.post(environment.apiUrl + 'auth/register', JSON.stringify(model), {
      headers: headers
    });
  }

  public logout(): void {
    this._accessToken = null;
    this.router.navigate(['/auth/login']);
  }

  private parseUserName(): void {
    let jwtBody = this._accessToken?.split('.')[1] ?? '';
    let jsonString = window.atob(jwtBody);
    let jsonObject = JSON.parse(jsonString);
    this._userName = jsonObject.name;
  }
}