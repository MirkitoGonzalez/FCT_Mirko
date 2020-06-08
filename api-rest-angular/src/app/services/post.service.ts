/*  Librerias AJAX y todo lo necesario */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Post } from '../models/post';
import { global } from './global';


@Injectable()
export class PostService {
    public url: string;
    public token;
    public identity;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    create(token, post):Observable<any>{
        let json = JSON.stringify(post);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.post(this.url + 'post', params, {headers: headers});
    }

    getCategories():Observable<any>{
        
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
                                        /* esto es mio por que si */
        return this._http.get(this.url + 'category', {headers: headers});
    }
    getPosts():Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post', {headers: headers});
    }

    /* una entrada post en especifico para manejarla */
    getPost(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/' + id, {headers: headers});
    }

    update(token, post, id):Observable<any>{
        let json = JSON.stringify(post);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.put(this.url + 'post/' + id, params, {headers: headers}); //AJAX
    }

    delete(token, id){
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded').set('Authorization', token);
        return this._http.delete(this.url + 'post/' + id, {headers: headers}); //AJAX

    }
}