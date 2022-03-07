import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { LoginComponent } from './login/login.component';
import {ReadPartnerComponent} from './read-partner/read-partner.component';
import {CreatePartnerComponent} from './create-partner/create-partner.component';
import {LoanComponent} from './loan/loan.component';
import {ReturnComponent} from './return/return.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login', component:LoginComponent},
  {path:'create', component:CreateComponent},
  {path:'create/:id', component:CreateComponent},
  {path:'read', component:ReadComponent},
  {path:'readPartner', component:ReadPartnerComponent},
  {path:'createPartner/:id', component:CreatePartnerComponent},
  {path:'createMachine/:id', component:CreateComponent},
  {path:'createPartner', component:CreatePartnerComponent},
  {path:'loan', component:LoanComponent},
  {path:'return', component:ReturnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
