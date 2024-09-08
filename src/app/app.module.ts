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
import { ResponsableTechniqueComponent } from './components/responsable-technique/responsable-technique.component';
import { CreatUserComponent } from './components/creat-user/creat-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AcceuilComponent,
    DashboarComponent,
    HeaderComponent,
    SidebarComponent,
    ResponsableTechniqueComponent,
    CreatUserComponent,
    ListUserComponent,
    UpdateUserComponent
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
