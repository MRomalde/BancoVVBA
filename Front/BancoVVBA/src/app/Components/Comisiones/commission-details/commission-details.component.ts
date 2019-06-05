import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommissionService } from 'src/app/Services/Commission/commission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commission } from 'src/app/Modelos/commission';

@Component({
  selector: 'app-commission-details',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css']
})
export class CommissionDetailsComponent implements OnInit {

  commission:Commission[];
  constructor(private fb: FormBuilder, private comService:CommissionService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute) { }


    formModel=this.fb.group({
      Description:['',[Validators.required]],
      Price:['',[Validators.required,Validators.min(0.1)]],
    });

  ngOnInit() {
    this.GetCurrentCommission();
  }

  GetCurrentCommission(){
    var commissionId=+this.route.snapshot.paramMap.get("id");
    this.comService.GetCommissionById(commissionId).subscribe(res=>{
      //its a list because is Async
      this.commission=res;
    });
  }
  Save(){
    this.comService.UpdateCommission(this.commission[0]).subscribe(res=>{
      this.toastr.success("Comision editada con exito","Editar Comision");
      this.router.navigate(["/commission/commissions"]);
    });
  }

}
