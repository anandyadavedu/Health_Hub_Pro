import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css'],
})
export class UpdatePatientComponent implements OnInit {
  dataItem: any;
  P_Name: any;
  P_Gender: any;
  P_Age: any;
  P_Weight: any;
  Address: any;
  MobileNo: any;
  P_ID: any;
  update = false;

  public PatientForm = new UntypedFormGroup({});

  constructor(
    private service: SharedService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    debugger;
    this.PatientForm = this.formBuilder.group({
      P_Name: ['', [Validators.required]],
      P_Gender: ['', [Validators.required]],
      P_Age: ['', [Validators.required]],
      P_Weight: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      MobileNo: ['', [Validators.required]],
    });

    this.dataItem = history.state;
    this.P_ID = this.dataItem.P_ID;
    this.P_Name = this.dataItem.P_Name;
    this.P_Gender = this.dataItem.P_Gender;
    this.P_Age = this.dataItem.P_Age;
    this.P_Weight = this.dataItem.P_Weight;
    this.Address = this.dataItem.Address;
    this.MobileNo = this.dataItem.MobileNo;
  }

  get formControl() {
    return this.PatientForm.controls;
  }

  UpdatePatient() {
    debugger;
    this.update = true;

    if (this.PatientForm.valid) {
      const formData = new FormData();

      formData.append('P_ID', this.P_ID);
      formData.append('P_Name', this.P_Name);
      formData.append('P_Gender', this.P_Gender);
      formData.append('P_Age', this.P_Age);
      formData.append('P_Weight', this.P_Weight);
      formData.append('Address', this.Address);
      formData.append('MobileNo', this.MobileNo);

      this.service.UpdatePatient(formData).subscribe((res) => {debugger
        if (res == 'Patient details Updated successfully.') {
          this.service.showAlert('Success', 'Patient is successfully updated!', 'success');
          

          // this.toastr.success('Successfully Updated', '');
          this.router.navigate(['patient']);
        } else {
          this.service.showAlert('Error', 'Something misssing in required fields!', 'error');

          this.router.navigate(['update-patient']);
        }
      });
    }
    else{
      this.service.showAlert('Error', 'Please fill required fields !', 'success');

    }
  }

  Cancel(){
    this.router.navigateByUrl('/patient');
  }
}
