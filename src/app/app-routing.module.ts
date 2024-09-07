import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AcceuilComponent} from "./components/acceuil/acceuil.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboarComponent} from "./components/dashboar/dashboar.component";
import { authGuard } from './auth.guard';
import {ResponsableTechniqueComponent} from "./components/responsable-technique/responsable-technique.component";
import {ListUserComponent} from "./components/list-user/list-user.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch:'full'},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboarComponent},
  { path: 'responsableTechnique', component: ResponsableTechniqueComponent},
  { path: 'listeUser', component: ListUserComponent},
  { path: '**', redirectTo: 'login' }  // Redirection vers la page de connexion pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
