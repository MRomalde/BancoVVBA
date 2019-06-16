import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommissionService } from 'src/app/Services/Commission/commission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commission } from 'src/app/Modelos/commission';
import { User } from 'src/app/Modelos/user';

@Component({
  selector: 'app-commission-create',
  templateUrl: './commission-create.component.html',
  styleUrls: ['./commission-create.component.css']
})
export class CommissionCreateComponent implements OnInit {

  CommissionToCreate:Commission;
  currentUser:User=JSON.parse(localStorage.getItem("currentUser"));
  constructor(private fb: FormBuilder, private comService:CommissionService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute) { }

    formModel=this.fb.group({
      Description:['',[Validators.required]],
      Price:['',[Validators.required,Validators.min(0.1),Validators.max(100)]],
    });

  ngOnInit() {
    if(this.currentUser.typeAccessId==2){
      this.router.navigate(["/user/myAccount"]);
    }
  }

  CreateCommission(){
    this.CommissionToCreate=new Commission(this.formModel.value.Description,
      this.formModel.value.Price);
    //call to the service to create commission
    this.comService.CreateCommission(this.CommissionToCreate).subscribe((res:any)=>{
      this.formModel.reset();
      this.toastr.success("Nueva comision creada","Creada con exito");
      this.router.navigate(["/commission/commissions"]);
    },
    err=>{console.log(err)});
  
  }

}
