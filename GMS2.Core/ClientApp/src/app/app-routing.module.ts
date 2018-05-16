import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  HomeComponent
} from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { DashboardComponent } from './admin-portal/dashboard/dashboard.component';
import { UsersComponent } from './admin-portal/users/users.component';
import { ReportsComponent } from './admin-portal/reports/reports.component';
import { FinancesComponent } from './admin-portal/finances/finances.component';
import { UserDashboardComponent } from './user-portal/dashboard/user-dashboard.component';
import { LessonsComponent } from './user-portal/lessons/lessons.component';
import { BillingComponent } from './user-portal/billing/billing.component';
import { ProfileComponent } from './user-portal/profile/profile.component';


const routes: Routes = [
  { path: 'index',  component: HomeComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'contact-us',  component: ContactUsComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'user-portal',  component: UserPortalComponent },
  { path: 'admin-portal',  component: AdminPortalComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UsersComponent},
    {path: 'finances', component: FinancesComponent},
    {path: 'reports', component: ReportsComponent},
  ] },
  { path: 'user-portal',  component: UserPortalComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: UserDashboardComponent},
    {path: 'lessons', component: LessonsComponent},
    {path: 'billing', component: BillingComponent},
    {path: 'profile', component: ProfileComponent},
  ] },
  { path: 'login',  component: LoginComponent },
  {  path: '',  redirectTo: '/index',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
