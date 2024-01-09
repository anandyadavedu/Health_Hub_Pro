import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  DoctorRegistrationForm: FormGroup = new FormGroup({}); 
  StaffRegistrationForm: FormGroup = new FormGroup({}); 

  tableData: any[] = [];
  filteredData: any[] = []; // Array to store filtered data
  filterText: string = ''; // Input field for filtering
  Staff_Name:any;
  Name:any;
  data:any;
  

  public subitted=false;
  dataItem:any;
  Doctor_Name:any;
  Doctor_Specialist:any;
  Contact_Number:any;
  Hospital_Id:any;
  Doctor_Id:any;
  Username:any;
  Password:any;

 
  JoinDate:any;
  Address:any;
  Position:any;
  StaffUsername:any;
  StaffPassword:any;
  StaffContact_Number:any;
  


  // res:any;

  constructor(private service:SharedService,
    private router:Router,
    private formBuilder:FormBuilder,
    private toastr:ToastrService
     ){}


  ngOnInit(): void {debugger
    this.DoctorRegistrationForm = this.formBuilder.group({
      Doctor_Name: ['', [Validators.required]],
      Doctor_Specialist: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]],
      Hospital_Id: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],

    });

    this.StaffRegistrationForm=this.formBuilder.group({
      Staff_Name: ['', [Validators.required]],
      JoinDate: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Position: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]]

    });

   this.refresh();
   this.Name=this.service.getUserName();

    // this.dataItem = history.state;
    // this.Staff_Name=this.dataItem.Staff_Name;
    // this.JoinDate=this.dataItem.JoinDate;
    // this.Address=this.dataItem.Address;
    // this.Position=this.dataItem.Position;
    // this.Username=this.dataItem.Username;
    // this.Password=this.dataItem.Password;
    // this.Contact_Number=this.Contact_Number;
   
  }



  get formControl(){
    return this.DoctorRegistrationForm.controls;
  }

  get formControlStaff(){
    return this.StaffRegistrationForm.controls;
  }


  refresh(){
    this.service.GetStaffDetails().subscribe((res:any)=>{
      this.tableData = res;
      this.filteredData = res; // Initialize filteredData with all data
    });
  }  

  
  isAdmin(): boolean {
    return this.service.getUserRole() === 1;
  }

  isDoctor(): boolean {
    return this.service.getUserRole() ===2;
  }

  isStaff(): boolean {
    return this.service.getUserRole() === 3;
  }

  filterTable(): void {
    this.filteredData = this.tableData.filter(item =>
      item.Staff_Name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }



//  Model Openand Close Method 
//  Model Openand Close Method 


openModal(Id:any){debugger
    const modal=document.getElementById(Id);
    const overlay = document.getElementById(`${Id}Overlay`);
    if(modal!=null){
      modal.style.display='block';

      if (overlay !== null) {
        overlay.style.display = 'block'; // Show the overlay
      }
    }
  }

  closeModal(Id:any){
    const modal=document.getElementById(Id);
    const overlay = document.getElementById(`${Id}Overlay`);
    if(modal!=null){
      modal.style.display='none';

      if (overlay !== null) {
        overlay.style.display = 'none'; // Show the overlay
      }
    }
  }

  // openUpdateModal(Id:any,data:any){debugger
  //   const modal=document.getElementById(Id);
  //   if(modal!=null){
  //     modal.style.display='block';

  //     this.subitted=true;
  //   // if(this.StaffRegistrationForm.valid){
  //     let formData=new FormData();
  //     formData.append('CreatedBy', this.service.getUserID());
  //     formData.append('Staff_Name', data.Staff_Name);
  //     formData.append('JoinDate', data.JoinDate);
  //     formData.append('Contact_Number', data.Contact_Number);
  //     formData.append('Address', data.Address);
  //     formData.append('Username', data.Username);
  //     formData.append('Password', data.Password);
  //     formData.append('Position', data.Position);

  //     this.service.UpdateStaffRegistration(formData).subscribe((res:any)=>{
  //       if(res=='Staff details Updated successfully.'){
  //         this.toastr.success('Successfully Added','');
  //         this.router.navigate(['registration']);
  //       }
  //       else{
  //         this.toastr.error('Something Missing','');
  //         this.router.navigate(['registration']);
  //       }
  //     });
  //   // }
  //   }
  // }

//  Model Openand Close Method 
//  Model Openand Close Method 


  DoctorAdd(){debugger
    this.subitted=true;
    if(this.DoctorRegistrationForm.valid){
      // const formData= this.DoctorRegistrationForm.value;
      let formData=new FormData();

      formData.append('Doctor_Name', this.DoctorRegistrationForm.value.Doctor_Name);
      formData.append('Doctor_Specialist', this.DoctorRegistrationForm.value.Doctor_Specialist);
      formData.append('Contact_Number', this.DoctorRegistrationForm.value.Contact_Number);
      formData.append('Hospital_Id', this.DoctorRegistrationForm.value.Hospital_Id);
      formData.append('Username', this.DoctorRegistrationForm.value.Username);
      formData.append('Password', this.DoctorRegistrationForm.value.Password);

      this.service.DoctorRegistration(formData).subscribe((res:any)=>{
        if(res=='Successfully added'){
          this.service.showAlert('Success', 'Doctor is successfully added!', 'success');
          // this.toastr.success('Successfully Added','');
          this.refresh();
          this.closeModal('DoctorModal');
          this.router.navigate(['registration']);
        }
        else{
          this.service.showAlert('Error', 'Something Misssing in data!', 'error');
          this.router.navigate(['dashboard']);
        }
      });
    }
    else{
      this.service.showAlert('Error', 'Please fill all required fields!', 'error');
    }
  }




  AddStaff(){debugger
    this.subitted=true;
    if(this.StaffRegistrationForm.valid){
      let formData=new FormData();
      formData.append('CreatedBy', this.service.getUserID());
      formData.append('Staff_Name', this.StaffRegistrationForm.value.Staff_Name);
      formData.append('JoinDate', this.StaffRegistrationForm.value.JoinDate);
      formData.append('Contact_Number', this.StaffRegistrationForm.value.Contact_Number);
      formData.append('Address', this.StaffRegistrationForm.value.Address);
      formData.append('Username', this.StaffRegistrationForm.value.Username);
      formData.append('Password', this.StaffRegistrationForm.value.Password);
      formData.append('Position', this.StaffRegistrationForm.value.Position);

      this.service.StaffRegistration(formData).subscribe((res:any)=>{
        if(res=='Successfully added'){
          this.service.showAlert('Success', 'Staff is successfully added!', 'success');
          // this.toastr.success('Successfully Added','');
          this.refresh();
          this.closeModal('StaffModal');
          this.router.navigate(['registration']);

        }
        else{
          this.service.showAlert('Error', 'Something Misssing in data!', 'error');
          // this.toastr.error('Something Missing','');
          this.router.navigate(['dashboard']);
        }
      });
    }
    else{
      this.service.showAlert('Error', 'Please fill all required fields!', 'error');
    }

  }


UpdateStaff(dataItem:any){debugger
    this.router.navigateByUrl('/update-staff', {state:dataItem});
    // this.openUpdateModal(Id,item );

}
deleteStaff(Item:any){debugger
    if(confirm('Are you sure??')){
      this.service.DeleteStaff(Item).subscribe((res:any)=>{
        if(res=='Staff Member details deleted successfully')
        {
          this.service.showAlert('Success', 'Staff is successfully deleted!', 'success');
          // this.toastr.success('Delete Successfully','');
          this.refresh();
        }else{
          this.service.showAlert('Error', 'Staff is successfully deleted!', 'error');

          this.toastr.error('Something Error','');
        }  
      })
    }
}
 


}
