import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HttpModule } from '@angular/http';
import { AppHomeComponent } from './app-home/app-home.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { EmployeesComponent } from './employees/employees.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CustomersComponent } from './customers/customers.component';
import { LogisticsComponent } from './logistics/logistics.component';
import { NgGridModule } from 'angular2-grid';
import { PaginationComponent } from './pagination/pagination.component';









@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    EmployeeLoginComponent,
    AdminHomeComponent,
    AppHomeComponent,
    AddAnnouncementComponent,
    EmployeesComponent,
    RoomsComponent,
    CustomersComponent,
    PaginationComponent,
    LogisticsComponent,
   
    
    
    
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,BrowserAnimationsModule, ToastModule.forRoot(),ToasterModule,NgGridModule,
    RouterModule.forRoot([
      {path: '',component: AppHomeComponent},
      {path: 'Rooms',component: RoomsComponent},
      {path: 'Logistics',component: LogisticsComponent},
      {path: 'Customers',component: CustomersComponent},
      {path: 'Employees',component: EmployeesComponent},
      
      {path: 'AdminLogin',component: AdminLoginComponent},
      {path:'EmployeeLogin',component:EmployeeLoginComponent},
      {path:'Announcements',component:AddAnnouncementComponent},
      {path: 'AdminHome',component: AdminHomeComponent}])
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
