import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { global } from 'src/app/services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'newpost',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status;
  public url;
  public post: Post;
  
  public options: Object = {
    placeholderText: 'Escribe tu entrada aquí',
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
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

   }

  ngOnInit(): void {
this.post = new Post(1,this.identity.sub,1,'','',null,null);
//console.log(this.post);
  }

  onSubmit(): void{

  }

}
