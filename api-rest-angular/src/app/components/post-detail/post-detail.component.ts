import { Component, OnInit } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from '../../services/post.service';
import { global } from 'src/app/services/global';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'postDetail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [UserService, CategoryService , PostService]
})
export class PostDetailComponent implements OnInit {
  //public page_title: string;
  public post: any;
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
    //this.page_title = 'entradadetalle';
  //  this.identity = this._userService.getIdentity();
  //   this.token = this._userService.getToken();
    this.url = global.url;
  }
  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    // sacaremos el id del post que nos viene de la url
    // (entrada/:id)
    this._route.params.subscribe(params => {
      let id = +params['id'];

      // petición AJAX para ello
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post= response.posts;
          }else{ this._router.navigate(['/inicio']);}
        }, error => {
          console.log(error); this._router.navigate(['/inicio']);
        }
      );
    });
  }

}
