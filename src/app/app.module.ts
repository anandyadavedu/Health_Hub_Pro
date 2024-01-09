import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { PatientComponent } from './patient/patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { StaffComponent } from './staff/staff.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import {MatBadgeModule} from '@angular/material/badge';
// import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddPatientComponent,
    PatientRecordComponent,
    LoginComponent,
    
    SignupComponent,
    PatientComponent,
    NewPatientComponent,
    StaffComponent,
    RegistrationComponent,
    SidebarComponent,
    UpdatePatientComponent,
    UpdateStaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MdbCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 3000, 
      positionClass: 'toast-top-right', 
      preventDuplicates: true,
    }),
    ReactiveFormsModule,  // use for binding data from formControlName
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
