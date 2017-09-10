import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../Announcement';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./assets/bootstrap/css/bootstrap.min.css'],
  providers:[AnnouncementService,LoginServiceService]
  
})
export class AppHomeComponent implements OnInit {

  announcements = [];
  adminname:String;
  res:String;
  loggedin:boolean;
  constructor(private Annservice:AnnouncementService,private _router:Router) { 

    Annservice.getAllAnnouncements().subscribe(
      response => 
      {
        console.log(response);
        this.res = JSON.stringify(response);
        console.log(this.res);
        if(response != "NoAnnouncements"){
          
          this.announcements = response;
          console.log(this.announcements.length);
        }else{

          this.announcements = [{'Id':0,'Announcement':"No Announcments"}]
          
        }
        
        
       /*   for (this.userId = 0; this.announcements.length; this.userId++) {
        this.table.items.push(new User(this.userId, `user ${this.userId}`,
                                    `Announcement${this.userId}`));
        } */ 
      },error=>alert(error)




    );


  }

  ngOnInit() {

    if(!!localStorage.getItem("Login")){
      var login = JSON.parse(localStorage.getItem("Login"));
      console.log(login.isloggedin);
      if(login.isloggedin =='loggedin'){
        //this._router.navigate(['AdminHome']);
        this.adminname = login.username;
        this.loggedin = true;
        //console.log(this.adminname);
      }
   
    }

  }

  adminlogout(){
    
        localStorage.removeItem("Login");
        this.loggedin = false;
        this._router.navigate(['']);
      }

  navigatetohome(){

     this._router.navigate(['AdminHome']);
      }
}
