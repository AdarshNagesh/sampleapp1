import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['../assets/bootstrap/css/bootstrap.min.css']
})
export class AdminHomeComponent implements OnInit {

  public adminname:String;
  public hideAnnouncement:boolean;
  constructor(private _router: Router) { 
    
  }

  ngOnInit() {
    if(!!localStorage.getItem("Login")){
      var login = JSON.parse(localStorage.getItem("Login"));
      console.log(login.isloggedin);
      if(login.isloggedin =='loggedin'){
        this._router.navigate(['AdminHome']);
        this.adminname = login.username;
        console.log(this.adminname);
      }
   
    }else{
      this._router.navigate(['AdminLogin']);
    }
  }


  adminlogout(){
    
    localStorage.removeItem("Login");
    this._router.navigate(['']);
  }

  setAdminHomeView(option){
    //console.log(this.showAnnouncement);
    switch(option){

      case "Announcement":
      this.hideAnnouncement = false;
      console.log(this.hideAnnouncement);
      break;
      

    }
  }

}
