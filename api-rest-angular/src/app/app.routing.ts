/* Imports 100% necesarios */
import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

/* Importamos componentes */
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

/* Definimos las rutas del proyecto */
const appRoutes: Routes = [
{path: '', component: HomeComponent},
{path: 'inicio', component: HomeComponent},
{path: 'login', component: LoginComponent},
{path: 'registro', component: RegisterComponent},
{path: '**', component: ErrorComponent}
];

/* Exportar configuración */
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);