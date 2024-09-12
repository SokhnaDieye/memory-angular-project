import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {AcceuilComponent} from "./components/acceuil/acceuil.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboarComponent} from "./components/dashboar/dashboar.component";
import { authGuard } from './auth.guard';
import {ListUserComponent} from "./components/list-user/list-user.component";
import {ProjetComponent} from "./components/projet/projet.component";
import {ListprojetComponent} from "./components/listprojet/listprojet.component";
import {ClientComponent} from "./components/client/client.component";
import {MilestoneComponent} from "./components/milestone/milestone.component";
import {DetailProjetComponent} from "./components/detail-projet/detail-projet.component";
import {PaiementComponent} from "./components/paiement/paiement.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch:'full'},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: AcceuilComponent},
  { path: 'listeUser', component: ListUserComponent},
  { path: 'project', component: ProjetComponent},
  { path: 'listproject', component: ListprojetComponent},
  { path: 'client', component: ClientComponent},
  { path: 'milestones', component: MilestoneComponent},
  { path: 'paiement', component: PaiementComponent},
  { path: 'detailsProjet/:id', component: DetailProjetComponent },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
