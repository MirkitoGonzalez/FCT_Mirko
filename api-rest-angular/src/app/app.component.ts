import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService,CategoryService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'api-rest-angular';
  public identity;
  public token;
  public url;
  public categories;
  
constructor(
  /*public to private*/
  private _userService: UserService,
  private _categoryService: CategoryService
){
  this.loadUser();
  this.url = global.url;
}

ngOnInit(){
  console.log('Nuestra web se ha cargado satisfactoriamente ♥');
  this.getCategories();
}

// hacemos la comprobacion de movimientos o cambios
ngDoCheck(){
this.loadUser();
}

// para no sobrecargar, generamos un método que lo haga donde lo necesitemos
loadUser(){
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
}

getCategories(){
  this._categoryService.getCategories().subscribe(
    response => {
      if(response.status == 'success'){
        this.categories = response.categories;
        console.log(this.categories);
      }
    },
    error => {
      console.log(error);
    }
  );

}

}
