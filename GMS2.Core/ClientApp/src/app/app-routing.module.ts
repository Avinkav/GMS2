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
import { InstrumentsComponent } from './shared/instruments/instruments.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
  { path: 'index', component: HomeComponent },
  { path: 'book-lesson', component: BookLessonComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin-portal', component: AdminPortalComponent, data: { breadcrumb: 'Admin Portal' }, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'users', component: UsersComponent, data: { breadcrumb: 'Users' } },
      { path: 'users/:id', component: ProfileComponent, data: { breadcrumb: 'User Details' } },
      { path: 'finances', component: FinancesComponent, data: { breadcrumb: 'Finances' } },
      { path: 'reports', component: ReportsComponent, data: { breadcrumb: 'Reports' } },
    ]
  },
  {
    path: 'user-portal', component: UserPortalComponent, data: { breadcrumb: 'User Portal' }, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent, data: { breadcrumb: 'Dashboard' } },
      { path: 'lessons', component: LessonsComponent, data: { breadcrumb: 'Lessons' } },
      { path: 'billing', component: BillingComponent, data: { breadcrumb: 'Billing' } },
      { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Profile' } },
      { path: 'instruments', component: InstrumentsComponent, data: { breadcrumb: 'Instruments' } }
    ]
  },
  {
    path: 'teacher-portal', component: TeacherPortalComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'income', component: IncomeComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
