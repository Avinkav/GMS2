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
import { ProfileComponent } from './shared/profile/profile.component';
import { BookLessonComponent } from './book-lesson/book-lesson.component';
import { TeacherPortalComponent } from './teacher-portal/teacher-portal.component';
import { TeacherDashboardComponent } from './teacher-portal/teacher-dashboard/teacher-dashboard.component';
import { ClassesComponent } from './teacher-portal/classes/classes.component';
import { IncomeComponent } from './teacher-portal/income/income.component';


const routes: Routes = [
  { path: 'index',  component: HomeComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'book-lesson',  component: BookLessonComponent },
  { path: 'contact-us',  component: ContactUsComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'admin-portal',  component: AdminPortalComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/:id', component: ProfileComponent},
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
  { path: 'teacher-portal',  component: TeacherPortalComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: TeacherDashboardComponent},
    {path: 'classes', component: ClassesComponent},
    {path: 'income', component: IncomeComponent},
  ] },
  { path: 'login',  component: LoginComponent },
  {  path: '',  redirectTo: '/index',  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
