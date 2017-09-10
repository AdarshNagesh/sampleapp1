import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  public adminname:String;
  constructor(private _router: Router) { }

  ngOnInit() {
    if(!!localStorage.getItem("Login")){
      var login = JSON.parse(localStorage.getItem("Login"));
      console.log(login.isloggedin);
      if(login.isloggedin =='loggedin'){
        this._router.navigate(['Customers']);
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
