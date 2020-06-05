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

/* Definimos las rutas del proyecto */
const appRoutes: Routes = [
/* {path: '', component: HomeComponent}, */
{path: 'inicio', component: HomeComponent},
{path: 'login', component: LoginComponent},
/* Para evitar otro componente usamos el del login para mandarle
este parametro extra y que nos expulse de nuestra sesión*/
{path: 'logout/:sure', component: LoginComponent},
{path: 'registro', component: RegisterComponent},
{path: 'ajustes', component: UserEditComponent},
{path: 'crearCategoria', component: CategoryNewComponent},
{path: 'crearEntrada', component: PostNewComponent},
/* si el usuario se equivoca y la ruta no existe... */
{path: '**', component: ErrorComponent}
];

/* Exportar configuración */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);