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
import { Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;
  //public posts: Array<Post>;
  public posts: any;
  public category: Category;
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
    this.page_title = 'DetalleCategoria';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }
  
  ngOnInit(): void {
    this.getPostsByCategory();
  }

  deletePost(id) {
    let borrar = confirm("Oye, ¿Seguro que deseas borrar la entrada?"); // un poquito de javascript bueno
    if(borrar){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
      },
      error => {
        console.log(error);
      }
    );
    }else{ /* no hago nada */ }
  }

  getPostsByCategory(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];

      this._categoryService.getCategory(id).subscribe(
        response => {
            if(response.status == 'success'){
              this.category = response.category;
              this._categoryService.getPosts(id).subscribe(
                response=>{
                    if(response.status == 'success'){
                        this.posts = response.posts;
                    }else{
                      this._router.navigate(['/inicio']);
                    }
                },
                error =>{

                }
              );
            }else{ this._router.navigate(['/inicio']);}
        },
        error => {
              console.log(error);
        }
      );
    });
  }
}
