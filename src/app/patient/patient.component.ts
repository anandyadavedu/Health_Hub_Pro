import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


declare var window:any;


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  PatientForm:FormGroup=new FormGroup({});
 
  dataItem:any;
  P_Name:any;
  P_Gender:any;
  P_Age:any;
  P_Weight:any;
  Address:any;
  MobileNo:any;
  P_ID:any;
  update=false;
  val:any

  updatePatient={
    P_Name:"",
    P_Gender:"",
    P_Age:"",
    P_Weight:"",
    Address:"",
    MobileNo:""
  }

  filterText: string = '';
  tableData: any[] = [];
  patientData: any[] = [];
  subitted:any;

 
  constructor(private service:SharedService,
    private router:Router,
    private formBuilder:FormBuilder,
    private toastr:ToastrService) {}

  ngOnInit(): void {

    this.refreshPatientList();


    this.PatientForm=this.formBuilder.group({
      P_Name: ['', [Validators.required]],
      P_Age: ['', [Validators.required]],
      P_Weight: ['', [Validators.required]],
      P_Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      MobileNo: ['', [Validators.required]],
    });


     
    this.dataItem = history.state;
    this.P_ID=this.dataItem.P_ID;
    this.P_Name=this.dataItem.P_Name; 
    this.P_Gender=this.dataItem.P_Gender;
    this.P_Age=this.dataItem.P_Age;
    this.P_Weight=this.dataItem.P_Weight;
    this.Address=this.dataItem.Address;
    this.MobileNo=this.dataItem.MobileNo;
    
      
  }

  get formControl(){
    return this.PatientForm.controls;
  }

  openModal(Id:any){debugger
    const modal=document.getElementById(Id);
    if(modal!=null){
      modal.style.display='block';
    }
  }
  openPatientModel(Id:any,val:any){debugger
    const modal=document.getElementById(Id);
    if(modal!=null){
      modal.style.display='block';
      console.log(val.P_ID)
      console.log(val.P_Name)
      console.log(val.P_ID)
      this.PatientForm.setValue({
        P_Name:this.val.P_Name,
        P_Age:this.val.P_Age,
        P_Weight:this.val.P_Weight,
        Address:this.val.Address,
        P_Gender:this.val.P_Gender,
        MobileNo:this.val.MobileNo,

      })

    this.update=true;

    // if(this.PatientForm.valid){

      const formData=new FormData();

      formData.append('P_ID',val.P_ID);
      formData.append('P_Name',val.P_Name);
      formData.append('P_Gender',val.P_Gender);
      formData.append('P_Age',val.P_Age);
      formData.append('Address',val.Address);
      formData.append('P_Weight',val.P_Weight);
      formData.append('MobileNo',val.MobileNo);
  

      this.service.UpdatePatient(formData).subscribe(res =>{debugger
        if (res == 'Update Successfully') {
          this.toastr.success('successfully Updated','');
          this.router.navigate(['project']);
        }
        else{
          this.router.navigate(['home']);
        }
      });

    // }
    }


  }

  closeModal(Id:any){
    const modal=document.getElementById(Id);
    if(modal!=null){
      modal.style.display='none';
    }
  }

  refreshPatientList(){
    this.service.GetPatientDetails().subscribe((res:any)=>{debugger
      this.tableData = res;
      this.patientData = res; // Initialize filteredData with all data
    });
  }

  filterTable(): void {
    this.patientData = this.tableData.filter(item =>
      item.P_Name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }


  AddPatient(){debugger
    this.subitted=true;
    if(this.PatientForm.valid){
      let formData=new FormData();
      // formData.append('CreatedBy', this.service.getUserID());
      formData.append('P_Name', this.PatientForm.value.P_Name);
      formData.append('P_Age', this.PatientForm.value.P_Age);
      formData.append('P_Weight', this.PatientForm.value.P_Weight);
      formData.append('Address', this.PatientForm.value.Address);
      formData.append('P_Gender', this.PatientForm.value.P_Gender);
      formData.append('MobileNo', this.PatientForm.value.MobileNo);

      this.service.PatientRegistration(formData).subscribe((res:any)=>{debugger
        
        if(res=='Patient details inserted successfully.'){
          this.toastr.success('Patient Successfully Added','');
          this.refreshPatientList();
          this.closeModal('PatientModal');
          this.router.navigate(['patient']);
        }
        else{
          this.toastr.error('Something Missing','');
          this.router.navigate(['patient']);
        }
      });
    }
  }


  DeletePatient(val:any){debugger
    if(confirm('Are you sure??')){
      this.service.DeletePatient(val).subscribe((res:any)=>{
        if(res=='Patient details deleted successfully.')
        {
          this.service.showAlert('Success', 'Patient is successfully deleted!', 'success');
          // this.toastr.success('Patient Deleted Successfully','');
          this.refreshPatientList();
        }else{
          this.toastr.error('Something Error','');
        }  
      })
    }
  }

  UpdatePatient(dataItem:any){debugger
    this.router.navigateByUrl('/update-patient', {state:dataItem});
    // this.openPatientModel('PatientModal',dataItem);
  }

  
}
