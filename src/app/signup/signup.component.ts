import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit{

  RegisterForm:FormGroup=new FormGroup({})
  subitted: any;

  constructor(private service:SharedService,
    private router:Router,
    private formBuilder:FormBuilder,
    private toastr:ToastrService ){}


  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({

      Hospital_Name: ['', [Validators.required]],
      Hospital_Address: ['', [Validators.required]],
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Email: ['', [Validators.required]],

    });
  }

  get formControl(){
    return this.RegisterForm.controls;
  }

  RegisterHospital(){debugger

    this.subitted=true;
    if(this.RegisterForm.valid){
      // const formData= this.DoctorRegistrationForm.value;
      let formData=new FormData();

      formData.append('Hospital_Name', this.RegisterForm.value.Hospital_Name);
      formData.append('Hospital_Address', this.RegisterForm.value.Hospital_Address);
      formData.append('Username', this.RegisterForm.value.Username);
      formData.append('Password', this.RegisterForm.value.Password);
      formData.append('Email', this.RegisterForm.value.Email);

      this.service.HospitalRegistration(formData).subscribe((res:any)=>{debugger
        if(res=='Successfully added'){
          this.toastr.success('Successfully Added','');
          this.router.navigate(['dashboard']);
        }
        else{
          this.router.navigate(['dashboard']);
        }
      });
    }

  }

}
