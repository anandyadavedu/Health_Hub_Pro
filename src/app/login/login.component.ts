import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm = new UntypedFormGroup({});
  username:any;
  password:any;
  invalid_msg: any;
  RoleId: any;
  Role:any;
  Name:any;
  public submitted=false;
  

  isPasswordVisible: boolean = false;
 
image:any;

  constructor(
    private service: SharedService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // RoleId:['',[Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });


    this.service.getRole().subscribe((data:any)=>{
      this.Role=data;
     
     });

     
  }

  get formControl() {
    return this.loginForm.controls;
  }
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  CheckLogin(){debugger
    this.submitted = true;
    if (this.loginForm.valid && this.selectedImage) {
      var val = {
        RoleId: this.selectedImage.RoleId,
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.service.Login(val).subscribe((res:any) => {debugger
        if (res.status == "Success") {
          this.toastr.success('Successfully login','');
          // this.service.setUserName(val.Name);
          this.service.setUserRole(val.RoleId);
          sessionStorage.setItem('UserName',res.data[0].Name);
          sessionStorage.setItem('UserId',res.data[0].UserID);

          this.service.setUserUserID(res.data[0].UserID);
          this.service.setUserName(res.data[0].Name);
          console.log(" Hello",res.data[0].UserID) ;
          console.log(" Hello",res.data[0].Name) ;
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['login']);
          this.invalid_msg = res.toString();
          this.toastr.error(this.invalid_msg);
        }
      });
    }
  }

  selectedImage: any; // Store the selected image here

  images = [
    { src: 'assets/Images/admin.jpeg', alt: 'Image 1', RoleId: 1 },
    { src: 'assets/Images/doctor.jpeg', alt: 'Image 2', RoleId: 2 },
    { src: 'assets/Images/staff.jpeg', alt: 'Image 3', RoleId: 3 },
    // Add more image objects as needed
  ];

  selectImage(image: any) {
    this.selectedImage = image;
  }



}


