import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  errormsg:any;
  success:any;
  readedDataMachine:any;
  readedDataPartner:any;
  selectedPartnerOption:any;
  printedPartnerOption:any;
  selectedMachineOption:any;
  printedMachineOption:any;
  canLoan:any;

  ngOnInit(): void {
    this.getMachineIdAndName();
    this.getPartnerIdAndName();
  }

  loanSubmit(){
    this.printedPartnerOption = this.selectedPartnerOption;
    this.printedMachineOption = this.selectedMachineOption;
    
    if(this.isLoanOk(this.printedPartnerOption,this.printedMachineOption)){
      this.service.setStateBusy(this.printedMachineOption).subscribe((res)=>{
        console.log(res,'res=>');
        
      });

      this.service.setPartnerIdForMachine(this.printedMachineOption,this.printedPartnerOption).subscribe((res)=>{
        console.log(res,"res==>");
        
      });
      this.success = "Sikeres kölcsönzés"
    }
  }

  //function for get machine id and name
  getMachineIdAndName(){
    this.service.getMachineIdAndName().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedDataMachine = res.data;
    });
  }

  //function for get partner id and name
  getPartnerIdAndName(){
    this.service.getPartnerIdAndName().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedDataPartner = res.data;
    });
  }

  //check select is ok
  isLoanOk(a:any, b:any){
    this.canLoan=false;
    if(isNaN(a)){
      this.errormsg='Választani kell egy ügyfelet!';
    }else if(isNaN(b)){
      this.errormsg='Választani kell egy gépet';
    }else{
      this.canLoan=true;
      this.errormsg='';
    }
    return this.canLoan;
  }

  
}
