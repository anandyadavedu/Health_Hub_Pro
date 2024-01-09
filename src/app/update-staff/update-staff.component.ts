import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css']
})
export class UpdateStaffComponent implements OnInit {
  

  dataItem: any;
  Staff_Name: any;
  P_Gender: any;
  Position: any;
  JoinDate: any;
  Address: any;
  Contact_Number: any;
  P_ID: any;
  update = false;
  Username:any;
  Password:any;
  Staff_id:any;

  public StaffRegistrationForm = new UntypedFormGroup({});

  constructor(
    private service: SharedService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    debugger;
    this.StaffRegistrationForm = this.formBuilder.group({
      Staff_Name: ['', [Validators.required]],
      Position: ['', [Validators.required]],
      JoinDate: [''],
      Address: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });

    this.dataItem = history.state;
    this.Staff_id = this.dataItem.Staff_id;
    this.Staff_Name = this.dataItem.Staff_Name;
    this.Position = this.dataItem.Position;
    this.JoinDate = this.dataItem.JoinDate;
    this.Address = this.dataItem.Address;
    this.Contact_Number = this.dataItem.Contact_Number;
    this.Username = this.dataItem.Username;
    this.Password = this.dataItem.Password;
  }

  get formControl() {
    return this.StaffRegistrationForm.controls;
  }

  UpdateStaff() {
    debugger;
    this.update = true;

    if (this.StaffRegistrationForm.valid) {
      const formData = new FormData();
      formData.append('CreatedBy', this.service.getUserID());
      formData.append('Staff_id', this.Staff_id);
      formData.append('Staff_Name', this.Staff_Name);
      formData.append('Position', this.Position);
      formData.append('JoinDate', this.JoinDate);
      formData.append('Address', this.Address);
      formData.append('Contact_Number', this.Contact_Number);
      formData.append('Username', this.Username);
      formData.append('Password', this.Password);

      this.service.UpdateStaff(formData).subscribe((res) => {debugger
        if (res == 'Staff details Updated successfully.') {
          this.toastr.success('Successfully Updated', '');
          this.router.navigate(['registration']);
        } else {
          this.router.navigate(['update-staff']);
        }
      });
    }
  }

  Cancel(){
    this.router.navigateByUrl('/registration');
  }

}
