import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'https://localhost:44343/api/';
  constructor(private http: HttpClient) {}

  public userRoleId: any;
  public UserID: any;
  public Name:any;

  SetSessionUserID() {debugger
  
    sessionStorage.setItem('userid', 'username');
  }
  SetSessionUserPassword() {debugger
    sessionStorage.setItem('password', 'password');
  }

  GetUserID() {debugger
    sessionStorage.getItem('userid');
  }
  GetPassword() {
    sessionStorage.getItem('password');
  }


  setUserName(name:any){
    this.Name=name;
  }
  getUserName(){
    return this.Name;
  }

  setUserUserID(ID: any) {debugger
    this.UserID = ID;
  }
  getUserID() {debugger
    return this.UserID;
  }
  setUserRole(role: any) {
    this.userRoleId = role;
  }

  getUserRole(): any {
    return this.userRoleId;
  }

  showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    Swal.fire(title, message, type);
  }



  Login(val: any) {debugger
    return this.http.post(this.APIUrl + 'Login/login', val);
  }

  getRole() {
    return this.http.get<any>(this.APIUrl + 'Login/Role');
  }

  DoctorRegistration(val: any) {
    return this.http.post(this.APIUrl + 'Doctor/InsertDoctor', val);
  }

  StaffRegistration(val: any) {
    return this.http.post(this.APIUrl + 'Staff/InsertStaff', val);
  }

  HospitalRegistration(val: any) {
    return this.http.post(this.APIUrl + 'Registration/InsertHospital', val);
  }

  GetStaffDetails() {
    return this.http.get<any>(this.APIUrl + 'StaffMember/GetDetails');
  }

  DeleteStaff(Id: any) {
   
    return this.http.post(this.APIUrl + 'StaffMember/Delete', Id);
  }

  GetPatientDetails(){debugger
    return this.http.get<any>(this.APIUrl + 'Patient/GetPatientDetails');
  }

  PatientRegistration(val:any){debugger
    return this.http.post(this.APIUrl + 'Patient/InsertPatient', val);

  }
  DeletePatient(Id:any){debugger
    return this.http.post(this.APIUrl + 'Patient/DeletePatient', Id);
  }

  UpdatePatient(Id:any){debugger
    return this.http.post(this.APIUrl+ 'Patient/UpdatePatient',Id)
  }

  UpdateStaff(Id:any){debugger
    return this.http.post(this.APIUrl+ 'Staff/UpdateStaff',Id)
  }
}
