import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/Modelos/commission';
import { CommissionService } from 'src/app/Services/Commission/commission.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {

  commissions:Commission[];
  p:number=1;
  constructor(private comService:CommissionService,private toastr:ToastrService) { }

  ngOnInit() {
    this.GetCommissions();
  }

  GetCommissions(){
    this.comService.GetAllCommissions().subscribe(res=>this.commissions=res);
  }

  DeleteCommission(commission:Commission){
  this.commissions=this.commissions.filter(com=>com!==commission);
  this.comService.DeleteCommission(commission.commissionId).subscribe(res=>this.toastr.info("Comision borrada","Borrado"));
  }
}
