/*  Librerias AJAX y todo lo necesario */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { threadId } from 'worker_threads';

@Injectable()
export class UserService {

    public url: string;
    public token;
    public identity;

    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }

    /* Esto me hará la peticion AJAX y me devolvera un observable
    donde tendré los datos devueltos por el api o el error */
    register(user): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, getToken = null): Observable<any> {
        if (getToken != null) {
            user.getToken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if(token && token != "undefined"){
            this.token = token;
        }
        else{
            this.token = null;
        }
    }
}