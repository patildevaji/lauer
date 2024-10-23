import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import appRoutes from './routerConfig';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { AppliedApplicationsComponent } from './applied-applications/applied-applications.component';
import { OpenAppComponent } from './open-app/open-app.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AddjobComponent } from './addjob/addjob.component';
import { ApplyComponent } from './apply/apply.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    UpdateComponent,
    AppliedApplicationsComponent,
    OpenAppComponent,
    AdmindashComponent,
    AddjobComponent,
    ApplyComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule , RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }