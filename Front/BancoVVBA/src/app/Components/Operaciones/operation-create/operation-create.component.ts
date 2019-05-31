import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { $ } from 'protractor';

@Component({
  selector: 'app-operation-create',
  templateUrl: './operation-create.component.html',
  styleUrls: ['./operation-create.component.css']
})
export class OperationCreateComponent implements OnInit {

  maxAmountToCreateOperation:number;

  constructor(private fb: FormBuilder, private operService:UserService,private router:Router,
    private toastr:ToastrService,private route: ActivatedRoute,) { }

    formModel=this.fb.group({
      SelectConcepto:['Elige un concepto',[Validators.required]],
      SelectAccounts:['Elige una cuenta',[Validators.required]],
      Date:[Date.now()],
      Cantidad:['',[Validators.required,Validators.max(this.maxAmountToCreateOperation)]],
      Mensaje:['',[Validators.required]],
    });
  ngOnInit() {
  }

  EnableSelectAccounts(){
    //this take element with that id and ser his disabled atribute a true
    let select=document.getElementById("selectAcc");
      select["disabled"]=false;
  }

}
