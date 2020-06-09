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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class ProfileComponent implements OnInit {
  public page_title: string;
  //public posts: Array<Post>;
  public posts: any;
  public user: User;
  public category: Category;
  public identity;
  public token;
  public today: number = Date.now();
  public status;
  public url;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _userService: UserService
  ) {
    this.page_title = 'Perfil';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

    /* Con esto devolvemos al form edit sus datos*/
    //this.user = this.identity; pero nos peta en el sub del ID
  }

  ngOnInit(): void {
    this.getUser(this.identity.sub);
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      (response) => {
        if (response.status == 'success') {
          /* console.log("response");
          console.log(response); */
          // Asignamos los datos del usuario,
          // ya que el response.user tiene datos extra
          this.user.image = response.user.image;
          this.user.name = response.user.name;
          this.user.surname = response.user.surname;
          this.user.email = response.user.email;
          this.user.description = response.user.description;
          console.log(this.user); // se puede obviar
        } else {
          this._router.navigate(['/inicio']);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

}
