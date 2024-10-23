import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppliedApplicationsComponent } from './applied-applications/applied-applications.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { ApplyComponent } from './apply/apply.component';



const appRoutes: Routes = [
  { path: 'home', 
    component: HomeComponent 
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'appliedApplications',
    component: AppliedApplicationsComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'update',
    component: UpdateComponent
  },
  {
    path: 'admindash',
    component: AdmindashComponent
  },
  {
    path: 'apply',
    component: ApplyComponent
  }
  

];
export default appRoutes;