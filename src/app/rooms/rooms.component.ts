import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public adminname:String;
  constructor(private _router: Router) { }

  ngOnInit() {
    if(!!localStorage.getItem("Login")){
      var login = JSON.parse(localStorage.getItem("Login"));
      console.log(login.isloggedin);
      if(login.isloggedin =='loggedin'){
        this._router.navigate(['Rooms']);
        this.adminname = login.username;
        //console.log(this.adminname);
      }
   
    }else{
      this._router.navigate(['AdminLogin']);
    }
  }

  adminlogout(){
    
        localStorage.removeItem("Login");
        this._router.navigate(['']);
      }
}
