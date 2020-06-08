import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from '../../services/post.service';
import { global } from 'src/app/services/global';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { AppComponent } from '../../app.component';
// extra
import { Inject } from '@angular/core';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MaterialModule } from './material.module';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public posts: Array<Post>;
  public identity;
  public token;
  public status;
  public url;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _userService: UserService
  ) {
    this.page_title = 'Inicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
          //console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePost(id) {
    let borrar = confirm("¿Seguro que quieres borrar la entrada?"); // un poquito de javascript bueno
    if(borrar){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPosts();
      },
      error => {
        console.log(error);
      }
    );
    }else{ /* no hago nada */ }
  }
}