import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'newcategory',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers:[UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public user: User;
  public category: Category;
  public identity;
  public token;
  public status;
  public url;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService : CategoryService
  ) {
    this.page_title = "Crear nueva categoría";
    this.category = new Category(1, '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

   }

  ngOnInit(): void {
  }

  onSubmit(form): void {
// console.log(this.category);
this._categoryService.create(this.token, this.category).subscribe(
response=> {
  if(response.status == 'success'){
    this.category = response.category;
    this.status = 'success';

    this._router.navigate(['/inicio']);

  }else{
    this.status = 'error';
  }

},
error => {
    this.status = 'error';
    console.log(error); console.log(<any>error);
}
);
  }

}
