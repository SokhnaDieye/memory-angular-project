import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { DashboarComponent } from './components/dashboar/dashboar.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreatUserComponent } from './components/creat-user/creat-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ListprojetComponent } from './components/listprojet/listprojet.component';
import { ClientComponent } from './components/client/client.component';
import { MilestoneComponent } from './components/milestone/milestone.component';
import { DetailProjetComponent } from './components/detail-projet/detail-projet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AcceuilComponent,
    DashboarComponent,
    HeaderComponent,
    SidebarComponent,
    CreatUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    ProjetComponent,
    ListprojetComponent,
    ClientComponent,
    MilestoneComponent,
    DetailProjetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
