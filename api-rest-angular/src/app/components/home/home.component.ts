import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from '../../services/post.service';
import { global } from 'src/app/services/global';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { Post } from '../../models/post';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
public posts: Array<Post>
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
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if(response.status == 'success'){
          this.posts = response.posts;
          console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
