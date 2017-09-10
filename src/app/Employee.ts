import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {

  private _url="http://adarshashwini/EmployeeServices/GetEmployees.php";
  private delete_url="http://adarshashwini/EmployeeServices/DeleteEmployee.php";
  private save_url="http://adarshashwini/EmployeeServices/SaveEmployee.php";
  
    constructor(private _http:Http) { }
  
    getAllEmployees(){
      var headers1 = new Headers();
      
      
      
      headers1.append('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
      /* return this._http.post(this._url,data1,{headers:headers1})
      .map((response:Response) => response.json()); */
      
      return this._http.get(this._url,{headers:headers1})
      .map((response:Response) => response.json());
      
      
    }


    deleteEmployee(data){
      var headers1 = new Headers();
     
      var data1 = JSON.stringify(data) ;
      console.log(data);
      headers1.append('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
      return this._http.post(this.delete_url,data1,{headers:headers1})
      .map((response:Response) => response.json());
      
     
      
    }


    saveEmployee(data){
      var headers1 = new Headers();
     
      var data1 = JSON.stringify(data) ;
      console.log(data1);
      headers1.append('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
      return this._http.post(this.save_url,data1,{headers:headers1})
      .map((response:Response) => response.json());
      
     
      
    }
    
    _errorHandler(Response: any){
      console.log(Response);
    }

}
