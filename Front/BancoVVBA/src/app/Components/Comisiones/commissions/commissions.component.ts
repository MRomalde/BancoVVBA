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
  }

  GetCommissions(){
    this.comService.GetAllCommissions().subscribe(res=>this.commissions=res);
  }
}
