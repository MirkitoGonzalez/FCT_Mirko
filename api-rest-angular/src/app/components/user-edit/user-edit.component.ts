import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';


@Component({
  selector: 'update',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;
  public url;
  public options: Object = {
    placeholderText: 'Escribe tu biografía aquí',
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: global.url + 'user/upload',
      headers: {
        'Authorization': this._userService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts:{
      selectFileBtn: 'Selecciona tu Avatar',
      resetBtn: 'Reset',
      uploadBtn: 'Subir archivo',
      dragNDropBox: 'Arrastra y Suelta',
      attachPinBtn: 'Selecciona tu Avatar',
      afterUploadMsg_success: 'Archivo guardado satisfactoriamente',
      afterUploadMsg_error: 'La subida del archivo ha fallado!',
    },
  };

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = 'Editar usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    console.log(this.token);

    /* Con esto devolvemos al form edit sus datos*/
    //this.user = this.identity; pero nos peta en el sub del ID
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      'ROLE_USER',
      this.identity.email,
      '',
      'default.png',
      '');
  }

  ngOnInit(): void {
    
   this.getUser(this.identity.sub);

  }

  onSubmit(editform): void {
    /* comprobamos que todo esta cogiendolo correctamente */
    console.log(this.user);
    console.log(this.token);
    //delete this.user['description']; delete this.user['image'];
    this._userService.update(this.token, this.user).subscribe(
      (response) => {
        console.log('aqui puede');
        if (response && response.status) {
          console.log(response);
          this.status = 'success';
          console.log('aqui puede que si');
          /* Actualizamos la sesión del usuario y sus cambios */
          if (response.changes.name) { this.identity.name = response.changes.name; }
          if (response.changes.surname) { this.identity.surname = response.changes.surname; }
          if (response.changes.email) { this.identity.email = response.changes.email; }
          if (response.changes.description) { this.identity.description = response.changes.description; }
          if (response.changes.image) { this.identity.image = response.changes.image; }
          
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //editform.reset();

          /* Petición POSTMAN */
          // {"description":"prueba","email":"admin@admin.com","name":"admin","surname":"admin","image":"avatar.jpg"}
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

avatarUpload(datos){
this.user.image = (datos.body.image);
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
          console.log(this.user);
        } else {
          this._router.navigate(['inicio']);
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

}