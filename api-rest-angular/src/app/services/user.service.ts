/*  Librerias AJAX y todo lo necesario */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {

    public url: string;

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
        return this._http.post(this.url+'register', params, { headers: headers });
    }

}