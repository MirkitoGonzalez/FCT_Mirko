/* Imports 100% necesarios */
import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

/* Importamos componentes */
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

/* cargamos lo necesario para la autenticación del proyecto */
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';

/* Definimos las rutas del proyecto */
const appRoutes: Routes = [
{path: '', component: HomeComponent},
{path: 'inicio', component: HomeComponent},
{path: 'login', component: LoginComponent},
/* Para evitar otro componente usamos el del login para mandarle
este parametro extra y que nos expulse de nuestra sesión*/
{path: 'logout/:sure', component: LoginComponent},
{path: 'registro', component: RegisterComponent},
{path: 'ajustes', component: UserEditComponent, canActivate: [IdentityGuard]},
{path: 'crearCategoria', component: CategoryNewComponent, canActivate: [IdentityGuard]},
{path: 'crearEntrada', component: PostNewComponent, canActivate: [IdentityGuard]},
{path: 'entrada/:id', component: PostDetailComponent},
{path: 'editarEntrada/:id', component: PostEditComponent, canActivate: [IdentityGuard]},
{path: 'categoria/:id', component: CategoryDetailComponent},
{path: 'perfil/:id', component: ProfileComponent, canActivate: [IdentityGuard]},
{path: 'error', component: ErrorComponent},
/* si el usuario se equivoca y la ruta no existe... */
{path: '**', component: ErrorComponent}
];

/* Exportar configuración */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);