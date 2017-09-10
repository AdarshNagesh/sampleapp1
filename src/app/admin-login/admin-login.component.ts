import { Component, OnInit , ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

import { ToasterContainerComponent,ToasterService,ToasterConfig ,Toast} from 'angular2-toaster';





@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: [],
  providers:[LoginServiceService,ToasterService],
  
  })
export class AdminLoginComponent implements OnInit {

  userlogindata = [];
  userdata="";
  isLoading:boolean = true;
  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-center',
    timeout : 10000
    //tapToDismiss : true
  });
  constructor(private _router: Router,private _loginservice:LoginServiceService,vcr: ViewContainerRef,private toasterService: ToasterService) { 
    //this.toastr.setRootViewContainerRef(vcr);
    
      
  
  }

  ngOnInit() {

    
  }

formSubmit(data){
 
  var toast: Toast = {
    type: 'error',
    title: 'Username or Password incorrect',
    showCloseButton: true};
  
  this._loginservice.getuser({'username':data.username,'password':data.password}).subscribe(response => 
    {this.userlogindata =response;
      // console.log(this.userlogindata);
      // console.log(response.status);
      localStorage.setItem("Login",JSON.stringify({username:response.username,id:response.useruniqueid,isloggedin:response.status}))
      console.log(response.role);
      if(response.status=='loggedin' && response.role==='1'){
       
        this._router.navigate(['AdminHome']);
      }else if(response.role==='2'){

        var toast1: Toast = {
          type: 'error',
          title: 'Not Authorized! Please Login as Employee',
          showCloseButton: true};
          this.toasterService.pop(toast1);


      }else{
       
        //this.toastr.success('oops','Oops!');
        this.toasterService.pop(toast);
        //alert("Username or password incorrect! Try Again");
        //this.popup.show();
        //this.toastr.error('oops','Oops!');
      }
      
      
    },error=>alert(error),()=>this.isLoading=false);
  

  /* console.log(data.username);
  
  console.log(location); */
  
  
  
}

}
