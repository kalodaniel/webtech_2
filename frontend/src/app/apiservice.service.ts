import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  
  constructor(private http:HttpClient) { }

  // connect frontend to backend

  apiUrl = 'http://localhost:3000/partner';
  logingUrl ='http://localhost:3000/logging';
  searchByNameUrl = 'http://localhost:3000/searchPartnerByName';
  searchByIdUrl = 'http://localhost:3000/searchPartnerById';
  machineUrl = 'http://localhost:3000/machine';
  searchByMachineNameUrl = 'http://localhost:3000/searchMachineByName';
  searchByMachineIdUrl = 'http://localhost:3000/searchMachineById';
  loanMachineUrl = 'http://localhost:3000/loanMachine';
  getMachineIdAndNameUrl = 'http://localhost:3000/getMachineIdAndName';
  getPartnerIdAndNameUrl = 'http://localhost:3000/getPartnerIdAndName';
  setStateBusyUrl = 'http://localhost:3000/setStateBusy';
  setPartnerIdForMachineUrl = 'http://localhost:3000/setPartnerIdForMachine';
  numberOfMachinesUrl = 'http://localhost:3000/numberOfMachines';
  setPartnerIdToDefaultUrl = 'http://localhost:3000/setPartnerIdToDefault';

  //getLoginData
  getLoginData(data:any):Observable<any>{
    console.log(data, 'logging==>');
    
    return this.http.post(`${this.logingUrl}`,data);
  }

  //get all partner

  getAllPartner():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  //create partner
  
  createPartner(data:any):Observable<any>{
    console.log(data,'createApi==>');
    
    return this.http.post(`${this.apiUrl}`,data);
  }

  //delete partner
  deletePartner(id:any):Observable<any>{
    let ids = id;
    return this.http.delete(`${this.apiUrl}/${ids}`);
  }

  //update partner
  updatePartner(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`${this.apiUrl}/${ids}`,data);
  }

  //getSinglePartner
  getSinglePartner(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`);
  }

  //search partner by name
  searchPartnerByName(name:any):Observable<any>{
    let nameVar = name;
    return this.http.get(`${this.searchByNameUrl}/${nameVar}`);
  }

  //search partner by id
  searchPartnerById(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.searchByIdUrl}/${ids}`);
  }

  //search machine by name
  searchMachineByName(name:any):Observable<any>{
    let nameVar = name;
    return this.http.get(`${this.searchByMachineNameUrl}/${nameVar}`);
  }

  //search machine by id
  searchMachineById(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.searchByMachineIdUrl}/${ids}`);
  }

  //get all machine

  getAllMachine():Observable<any>{
    return this.http.get(`${this.machineUrl}`);
  }

  //create partner
  
  createMachine(data:any):Observable<any>{
    return this.http.post(`${this.machineUrl}`,data);
  }

  //delete partner
  deleteMachine(id:any):Observable<any>{
    let ids = id;
    return this.http.delete(`${this.machineUrl}/${ids}`);
  }

  //update partner
  updateMachine(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`${this.machineUrl}/${ids}`,data);
  }

  //getSinglePartner
  getSingleMachine(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.machineUrl}/${ids}`);
  }

  //loan machine
  loanMachine(data:any):Observable<any>{
    return this.http.post(`${this.loanMachineUrl}`,data);
  }

  //get machine id and name
  getMachineIdAndName():Observable<any>{
    return this.http.get(`${this.getMachineIdAndNameUrl}`);
  }

  //get partner id and name
  getPartnerIdAndName():Observable<any>{
    return this.http.get(`${this.getPartnerIdAndNameUrl}`);
  }

  //set state busy
  setStateBusy(id:any):Observable<any>{

    var jsonObject = {"id":id};
    
    return this.http.put(`${this.setStateBusyUrl}`,jsonObject);
  }

  setPartnerIdForMachine(machineId:any,partnerId:any):Observable<any>{

    var jsonObject = {"machineId":machineId, "partnerId":partnerId};
    
    return this.http.put(`${this.setPartnerIdForMachineUrl}`,jsonObject);
  }

  numberOfMachines(partnerId:any):Observable<any>{
    return this.http.get(`${this.numberOfMachinesUrl}/${partnerId}`);
  }

  setPartnerIdToDefault(partnerId:any):Observable<any>{
    var jsonObject = {"partnerId":partnerId};
    return this.http.put(`${this.setPartnerIdToDefaultUrl}`,jsonObject);
  }


}
