import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-read-partner',
  templateUrl: './read-partner.component.html',
  styleUrls: ['./read-partner.component.css']
})
export class ReadPartnerComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }

  readedData:any;
  successmsg:any;
  getParamName:any;

  ngOnInit(): void {
    this.getAllPatners();
  }

  searchByNameForm = new FormGroup({
    'searchbyName': new FormControl('',Validators.required),
  });

  searchByIdForm = new FormGroup({
    'searchbyId': new FormControl('',Validators.required),
  });

//searchByName
  searchByName(){
    if(this.searchByNameForm.valid){
      this.service.searchPartnerByName(this.searchByNameForm.get('searchbyName')?.value).subscribe((res)=>{
        this.readedData = res.data;
        
      });
    }
    
  }

  //searchById
  searchById(){
    if(this.searchByIdForm.valid){
      this.service.searchPartnerById(this.searchByIdForm.get('searchbyId')?.value).subscribe((res)=>{
        this.readedData = res.data;
        
      });
    }
    
  }

  //getdeleteId
  deleteID(id:any){
    console.log(id, 'deleteId==>');
    this.service.deletePartner(id).subscribe((res)=>{
        console.log(res,'deleteres==>');
        this.successmsg=res.message;
        
       this.getAllPatners();
    });
    
  }

  //getPartners function
  getAllPatners(){
    this.service.getAllPartner().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedData = res.data;
    });
  }
  

}
