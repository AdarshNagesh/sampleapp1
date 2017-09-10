import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgGrid } from 'angular2-grid';
import { TableComponent } from 'angular2-datagrid/src/app/demo';
import { AnnouncementService } from '../Announcement';
import { NgDataGridModel } from 'angular2-datagrid/src/app/datagrid/ng-datagrid.model';

import { User } from 'angular2-datagrid/src/app/demo/inMemory.model';
import 'angular2-datagrid/src/app/utils/array.extensions';
import { ToasterContainerComponent,ToasterService,ToasterConfig ,Toast} from 'angular2-toaster';



@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css','../assets/bootstrap/css/bootstrap.min.css'],
  providers:[ToasterService,AnnouncementService],
})
export class AddAnnouncementComponent implements OnInit {

  table: NgDataGridModel<User>;
  //newtable: NgDataGridModel<User>;
  save:boolean;
  newann:String;
  recentlyRemoveUsers: any[];
  editingData = [];
  announcements = [];
  selectALL:boolean;
  res:String;
  private isLoading:boolean;
  private userId: number = 0;
  public adminname:String;
  public announcement:String;
  public Announcements=[];
  public tableSelection=[];
  public selectedAll:boolean = false;
  public Selected:boolean;
  public annedit:boolean = false;
  
    

      public config1 : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-center',
        timeout : 3000
        //tapToDismiss : true
      });
  constructor(private Annservice:AnnouncementService, private _router: Router,vcr: ViewContainerRef,private toasterService: ToasterService) {

    this.table = new NgDataGridModel<User>([]);
    Annservice.getAllAnnouncements().subscribe(
      response => 
      {
        console.log(response);
        this.res = JSON.stringify(response);
        console.log(this.res);
        if(response === "NoAnnouncements"){

         // this.announcements = [{'Id':0,'Announcement':this.res}]

        }else{


          this.announcements = response;
          console.log(this.announcements.length);
          var i;
          for (i = 0; i < this.announcements.length; ++i) {
            console.log(this.announcements[i]);
            this.table.items.push(new User(this.announcements[i].Announcement_Id,"",this.announcements[i].Announcement,true))
        }


          
        }
            
            /*   for (this.userId = 0; this.announcements.length; this.userId++) {
              this.table.items.push(new User(this.userId, `user ${this.userId}`,
                                          `Announcement${this.userId}`));
              } */ 
            },error=>alert(error),()=>this.isLoading=false




          );
    }

  ngOnInit() {
    if(!!localStorage.getItem("Login")){
      var login = JSON.parse(localStorage.getItem("Login"));
      console.log(login.isloggedin);
      if(login.isloggedin =='loggedin'){
       // this._router.navigate(['Announcements']);
       this.adminname = login.username;
      // console.log(this.adminname);
    /*  this.Announcements = [{announcement:"sdfdsfdvkjndjkfnsdkn",editable:"false"},{announcement:"dgfhfghgfhdsjfkjsdnfkjdsnfkjsdn",editable:"false"},
      
       ];  */
       /* this.announcements.forEach(
        function(ann){
        console.log(ann.Id);
        console.log(ann.Announcement);
        this.table.items.push(new User(1,"",""));

      }); */

      
     
      }
      
      console.log(this.announcements.length);
      
    }else{
      this._router.navigate(['AdminLogin']);
    }
  }

  adminlogout(){
    
        localStorage.removeItem("Login");
        this._router.navigate(['']);
      }


 

     

   


  addRecordPlugin() {
        this.Annservice.getAllAnnouncements().subscribe(
          response => 
          {
            console.log(response);
            this.res = JSON.stringify(response);
            console.log(this.res);
            if(response === "NoAnnouncements"){
              let userId = 1;
              //userId = userId+1;
              console.log(userId);
              this.editingData[userId] = true;
              this.table.items.push(new User(userId, `user ${userId}`, ""));
            }else{
              this.announcements = response;
              console.log(this.announcements.length);
              var usrid =  parseInt(this.announcements[this.announcements.length-1].Announcement_Id) +1;
              console.log(usrid);
              let userId = usrid
              //userId = userId+1;
              console.log(userId);
              this.editingData[userId] = true;
              this.table.items.push(new User(userId, `user ${userId}`, ""));
              
             /*   for (this.userId = 0; this.announcements.length; this.userId++) {
              this.table.items.push(new User(this.userId, `user ${this.userId}`,
                                          `Announcement${this.userId}`));
              } */

            }
             
          },error=>alert(error),()=>this.isLoading=false
    
    
    
    
        );
       
      
          
    }

  removeRecordPlugin(item) {
      console.log(item);
     
        this.recentlyRemoveUsers = this.table.items.remove(item);

        this.Annservice.deleteAnnouncement({'Id':item.userId}).subscribe(response => 
              {
               console.log(response);
                if(response.status=='success'){
                  var toast: Toast = {
                    type: 'success',
                    title: 'Announcement deleted successfully',
                    showCloseButton: true};
                    this.toasterService.pop(toast);
                  
                }else{
                 
                  var toast: Toast = {
                    type: 'error',
                    title: 'Announcement not deleted',
                    showCloseButton: true};
                    this.toasterService.pop(toast);
                }
                
                
              },error=>alert(error),()=>this.isLoading=false

            );
         
     
    }

  removeAllselectedAnn() {
        
            var i;
            var del:boolean = true;
            var len = this.table.itemsOnCurrentPage.length;
            console.log(len);
            for (i = 0; i < len; ++i) {
              console.log(this.table.itemsOnCurrentPage[i].active);
             if (this.table.itemsOnCurrentPage[i].active === true){
               console.log(this.table.itemsOnCurrentPage[i].userId);
              this.Annservice.deleteAnnouncement({'Id':this.table.itemsOnCurrentPage[i].userId}).subscribe(response => 
                {
                 console.log(response);
                  if(response.status=='success'){
                    //del = true;
                    
                  }else{
                    del = false;
                    
                  }
                  
                  
                },error=>alert(error),()=>this.isLoading=false
  
              );

              
             }
              
          }

          if(del){
            this.recentlyRemoveUsers = this.table.items
            .remove(item => item.active === true);
            var toast: Toast = {
              type: 'success',
              title: 'Selected Announcements deleted successfully',
              showCloseButton: true};
              this.toasterService.pop(toast);
              console.log(this.selectALL);
              this.selectALL = !this.selectALL;
          }else{
            var toast: Toast = {
              type: 'error',
              title: 'Announcements not deleted',
              showCloseButton: true};
              this.toasterService.pop(toast);

          }

            
    }

  changedActiveStatus(e: any) {
      
      console.log(this.selectALL);
        this.selectALL = !this.selectALL;
        console.log(this.selectALL);
        if (this.selectALL) {
          
            this.table.itemsFiltered.forEach(user => user.active = e.target.checked);
        } else {
            this.table.itemsOnCurrentPage.forEach(user => user.active = e.target.checked);
        }

      
    }


  editRecordPlugin(user){

      console.log(user.userId);
      this.editingData[user.userId] = true;
    }

  saveRecordPlugin(user){
      console.log(user.userId);
      
      if(user.username===""){
        var toast: Toast = {
          type: 'warning',
          title: 'No Announcement entered',
          showCloseButton: true};
          this.toasterService.pop(toast);
      }else{
           //user.username = this.newann;
      this.Annservice.saveAnnouncement({'Id':user.userId,'Announcement':user.username}).subscribe(response => 
        {

         console.log(response);
          if(response.status=='success'){
            var toast: Toast = {
              type: 'success',
              title: 'Announcement saved successfully',
              showCloseButton: true};
              this.toasterService.pop(toast);
              user.savedtoDB = true;
              this.editingData[user.userId] = false;
          }else{
           
            var toast: Toast = {
              type: 'error',
              title: 'Announcement save unsuccessfull',
              showCloseButton: true};
              this.toasterService.pop(toast);
          }
          
          
        },error=>alert(error),()=>this.isLoading=false

      );

      }
     
    }


  canceleditRecordPlugin(user){

    console.log(user.savedtoDB);
      if(user.savedtoDB === false){
        this.table.items.remove(user);
      }else{

        console.log(user.userId);
        this.Annservice.getAllAnnouncements().subscribe(
          response => 
          {
            console.log(response);
            this.res = JSON.stringify(response);
            console.log(this.res);
            if(response === "NoAnnouncements"){
    
             // this.announcements = [{'Id':0,'Announcement':this.res}]
    
            }else{
    
    
              this.announcements = response;
              user.username=this.announcements[user.userId-1].Announcement;
    
    
              
            }
                
                /*   for (this.userId = 0; this.announcements.length; this.userId++) {
                  this.table.items.push(new User(this.userId, `user ${this.userId}`,
                                              `Announcement${this.userId}`));
                  } */ 
                },error=>alert(error),()=>this.isLoading=false
    
    
    
    
              );
        this.editingData[user.userId] = !this.editingData[user.userId];
        console.log(this.editingData[user.userId]);

      }
      
      

    }
}

