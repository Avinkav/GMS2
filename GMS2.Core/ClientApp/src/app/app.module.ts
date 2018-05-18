import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './/app-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './admin-portal/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { UsersComponent } from './admin-portal/users/users.component';
import { ReportsComponent } from './admin-portal/reports/reports.component';
import { FinancesComponent } from './admin-portal/finances/finances.component';
import { LessonsComponent } from './user-portal/lessons/lessons.component';
import { ProfileComponent } from './user-portal/profile/profile.component';
import { BillingComponent } from './user-portal/billing/billing.component';
import { UserDashboardComponent } from './user-portal/dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatListModule, MatStepperModule, MatIconModule } from '@angular/material';
import { BookLessonComponent } from './book-lesson/book-lesson.component';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AdminPortalComponent,
    UserPortalComponent,
    UsersComponent,
    BillingComponent,
    UserDashboardComponent,
    ReportsComponent,
    FinancesComponent,
    LessonsComponent,
    ProfileComponent,
    BookLessonComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    ChartModule,
    MatStepperModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
