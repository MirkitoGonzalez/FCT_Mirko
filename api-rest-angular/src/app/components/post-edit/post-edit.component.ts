import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { global } from 'src/app/services/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status;
  public url;
  public post: Post;
  public categories;
  
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
      url: global.url + 'post/upload',
      headers: {
        'Authorization': this._userService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts:{
      selectFileBtn: 'Selecciona tu imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Subir archivo',
      dragNDropBox: 'Arrastra y Suelta',
      attachPinBtn: 'Selecciona tu imagen',
      afterUploadMsg_success: 'Archivo guardado satisfactoriamente',
      afterUploadMsg_error: 'La subida del archivo ha fallado!',
    },
  };

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

   }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.sub,1, '', '', null, null);
    this.getPost();
  }

  // para que no me guarde otro y se actualice
  onSubmit(postForm): void{
    this._postService.update(this.token, this.post, this.post.id).subscribe(
        response => {
          if(response.status == 'success'){
            this.status = 'success';
            //this.post = response.post
            /* redirigimos al post en sí*/
            this._router.navigate(['/entrada', this.post.id]);
          }
          else{
            this.status = 'error';
          }
        }, error => {

        }
    );
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


  imageUpload(datos){
    this.post.image = (datos.body.image);
  //  let image_data = JSON.parse(datos.response);
  //  this.post.image = image_data.image;
    }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
          //console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    );
  
  }
}