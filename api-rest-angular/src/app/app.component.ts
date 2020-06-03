import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
/*import { ConfirmationDialogService } from "./confirmation-dialog/confirmation-dialog.service";*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'api-rest-angular';
  public identity;
  public token;
  
constructor(
  public _userService: UserService
){
  this.loadUser();
}

ngOnInit(){
  console.log('Nuestra web se ha cargado satisfactoriamente ♥');
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

}
