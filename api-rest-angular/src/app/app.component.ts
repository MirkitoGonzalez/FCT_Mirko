import { Component } from '@angular/core';
import { UserService } from './services/user.service';
/*import { ConfirmationDialogService } from "./confirmation-dialog/confirmation-dialog.service";*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'api-rest-angular';
  public identity;
  public token;
  
constructor(
  public _userService: UserService
){
this.identity = this._userService.getIdentity();
}
}
