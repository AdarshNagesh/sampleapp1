import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AnnouncementService {

  private _url="http://adarshashwini/GetAnnouncements.php";
  private delete_url="http://adarshashwini/DeleteAnnouncement.php";
  private save_url="http://adarshashwini/SaveAnnouncement.php";
  
    constructor(private _http:Http) { }
  
    getAllAnnouncements(){
      var headers1 = new Headers();
      
      
      
      headers1.append('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
      /* return this._http.post(this._url,data1,{headers:headers1})
      .map((response:Response) => response.json()); */
      
      return this._http.get(this._url,{headers:headers1})
      .map((response:Response) => response.json());
      
      
    }


    deleteAnnouncement(data){
      var headers1 = new Headers();
     
      var data1 = JSON.stringify(data) ;
      console.log(data);
      headers1.append('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
      return this._http.post(this.delete_url,data1,{headers:headers1})
      .map((response:Response) => response.json());
      
     
      
    }


    saveAnnouncement(data){
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
