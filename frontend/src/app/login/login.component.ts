import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiserviceService,private router: Router) { }

  errormsg:any;

  ngOnInit(): void {
  }

  //check login
  loginForm = new FormGroup({
    'username': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required)
  });

  loginSubmit(){

    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.service.getLoginData(this.loginForm.value).subscribe((res)=>{
        if(res.data[0].numberOfUsers==1){
          this.router.navigate(["/create"]);
        }
        else{
          this.errormsg='Hibás a felhasználónév vagy a jelszó'
        }
      });
    }else {
      // this.errorsmsg = 'All field is required!';
    }
  }

}
