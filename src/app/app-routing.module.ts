import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientRecordComponent } from './patient-record/patient-record.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PatientComponent } from './patient/patient.component';
import { StaffComponent } from './staff/staff.component';
import { RegistrationComponent } from './registration/registration.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'add-patient',component:AddPatientComponent},
  {path:'patient-record',component:PatientRecordComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'staff',component:StaffComponent},
  {path:'signup',component:SignupComponent},
  {path:'patient',component:PatientComponent},
  {path:'new-patient',component:NewPatientComponent},
  {path:'update-patient',component:UpdatePatientComponent},
  {path:'update-staff',component:UpdateStaffComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
