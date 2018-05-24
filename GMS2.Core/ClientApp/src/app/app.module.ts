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
import { ProfileComponent } from './shared/profile/profile.component';
import { BillingComponent } from './user-portal/billing/billing.component';
import { UserDashboardComponent } from './user-portal/dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatListModule, MatStepperModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BookLessonComponent } from './book-lesson/book-lesson.component';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FilterPipe } from './pipes/filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { CalendarModule } from 'angular-calendar';
import { ProgressComponent } from './progress/progress.component';
import { TeacherPortalComponent } from './teacher-portal/teacher-portal.component';
import { TeacherDashboardComponent } from './teacher-portal/teacher-dashboard/teacher-dashboard.component';
import { ClassesComponent } from './teacher-portal/classes/classes.component';
import { IncomeComponent } from './teacher-portal/income/income.component';
import { UserDetailsComponent } from './shared/user-details/user-details.component';
import { TeacherComponent } from './shared/teacher/teacher.component';
import { StudentComponent } from './shared/student/student.component';
import { SelectTeacherComponent } from './book-lesson/select-teacher/select-teacher.component';
import { SelectDateComponent } from './book-lesson/select-date/select-date.component';
import { SelectInstrumentComponent } from './book-lesson/select-instrument/select-instrument.component';
import { ConfirmComponent } from './book-lesson/confirm/confirm.component';

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
    FilterPipe,
    HomeCarouselComponent,
    ProgressComponent,
    TeacherPortalComponent,
    TeacherDashboardComponent,
    ClassesComponent,
    IncomeComponent,
    UserDetailsComponent,
    TeacherComponent,
    StudentComponent,
    SelectTeacherComponent,
    SelectDateComponent,
    SelectInstrumentComponent,
    ConfirmComponent,
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
    FormsModule,
    NgxPageScrollModule,
    MatButtonModule,
    HttpClientModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot()
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
