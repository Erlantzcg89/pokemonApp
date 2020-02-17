import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { BackofficeComponent } from './paginas/backoffice/backoffice.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'backoffice', component: BackofficeComponent },
  { path: '**', redirectTo: "/inicio" }

];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
