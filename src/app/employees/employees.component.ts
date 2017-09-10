import { Component, OnInit ,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from 'angular2-datagrid/src/app/demo';
import { EmployeeService } from '../Employee';
import { BranchService } from '../Branch';
import { NgDataGridModel } from 'angular2-datagrid/src/app/datagrid/ng-datagrid.model';

import { User } from './EmployeeModel';
import 'angular2-datagrid/src/app/utils/array.extensions';
import { ToasterContainerComponent,ToasterService,ToasterConfig ,Toast} from 'angular2-toaster';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers:[ToasterService,EmployeeService,BranchService]
})
export class EmployeesComponent implements OnInit {
  table: NgDataGridModel<User>;
  public adminname:String;
  searchText:string="A";
  save:boolean;
  newann:String;
  recentlyRemoveUsers: any[];
  editingData = [];
  employees = [];
  Branch = [];
  RoleNames = ["Admin","Employee"];
  selectALL:boolean;
  res:String;
  Branchname:String;
  private isLoading:boolean;
  private userId: number = 0;
 
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


  constructor(private _Branchservice:BranchService,private Empservice:EmployeeService, private _router: Router,vcr: ViewContainerRef,private toasterService: ToasterService) { 

    this.table = new NgDataGridModel<User>([]);
    Empservice.getAllEmployees().subscribe(
      response => 
      {
        console.log(response);
        this.res = JSON.stringify(response);
        console.log(this.res);
        if(response === "NoEmployees"){

         // this.announcements = [{'Id':0,'Announcement':this.res}]

        }else{


          this.employees = response;
          console.log(this.employees.length);
          var i;
          for (i = 0; i < this.employees.length; ++i) {
            console.log(this.employees[i]);
            /* this._Branchservice.getBranchDetailsById({'Id':this.employees[i].Branch}).subscribe(
              response =>{
                console.log(response);
                this.Branch=response;
                console.log(this.Branch[0].BranchName);
                this.Branchname = this.Branch[0].BranchName;
              }
            ); */
            this.table.items.push(new User(this.employees[i].Id,
              this.employees[i].Emp_Id,
              this.employees[i].username,
              this.employees[i].First_Name,
              this.employees[i].Last_Name,
              this.employees[i].Email,
              this.employees[i].Branch,
              this.employees[i].Role,
              true));
              //console.log(this.employees[i].username);
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
        this._router.navigate(['Employees']);
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


      addRecordPlugin() {
        this.Empservice.getAllEmployees().subscribe(
          response => 
          {
            console.log(response);
            this.res = JSON.stringify(response);
            console.log(this.res);
            if(response === "NoEmployees"){
              let userId = 1;
              //userId = userId+1;
              console.log(userId);
              this.editingData[userId] = true;
              this.table.items.push(new User(userId,"","","","","","","",false));
            }else{
              this.employees = response;
              console.log(this.employees.length);
              var usrid =  parseInt(this.employees[this.employees.length-1].Id) +1;
              console.log(usrid);
              let userId = usrid
              //userId = userId+1;
              console.log(userId);
              this.editingData[userId] = true;
              this.table.items.push(new User(userId,"","","","","","","",false));
              
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

        this.Empservice.deleteEmployee({'Id':item.userId}).subscribe(response => 
              {
               console.log(response);
                if(response.status=='success'){
                  var toast: Toast = {
                    type: 'success',
                    title: 'Employee deleted successfully',
                    showCloseButton: true};
                    this.toasterService.pop(toast);
                  
                }else{
                 
                  var toast: Toast = {
                    type: 'error',
                    title: 'Employee not deleted',
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
            this.Empservice.deleteEmployee({'Id':this.table.itemsOnCurrentPage[i].userId}).subscribe(response => 
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
            title: 'Selected Employees deleted successfully',
            showCloseButton: true};
            this.toasterService.pop(toast);
            console.log(this.selectALL);
            this.selectALL = !this.selectALL;
        }else{
          var toast: Toast = {
            type: 'error',
            title: 'Employees not deleted',
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
              title: 'No details entered',
              showCloseButton: true};
              this.toasterService.pop(toast);
          }else{
               //user.username = this.newann;
          this.Empservice.saveEmployee({'Id':user.userId,
          'Emp_Id':user.Emp_Id,
          'username':user.username,
          'First_Name':user.First_name,
          'Last_Name':user.Last_name,
          'Email':user.Email,
          'Branch':user.Branch_Id,
          'Role':user.Role,
       
        
        }).subscribe(response => 
            {
    
             console.log(response);
              if(response.status=='success'){
                var toast: Toast = {
                  type: 'success',
                  title: 'Employee data saved successfully',
                  showCloseButton: true};
                  this.toasterService.pop(toast);
                  user.savedtoDB = true;
                  this.editingData[user.userId] = false;
              }else{
               
                var toast: Toast = {
                  type: 'error',
                  title: 'Employee data save unsuccessfull',
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
            this.Empservice.getAllEmployees().subscribe(
              response => 
              {
                console.log(response);
                this.res = JSON.stringify(response);
                console.log(this.res);
                if(response === "NoEmployees"){
        
                 // this.announcements = [{'Id':0,'Announcement':this.res}]
        
                }else{
        
        
                  this.employees = response;
                  user.username=this.employees[user.userId-1].username;
        
        
                  
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

      GetBranchName(Id){

        var Branchname:string;
        console.log(Id);
        switch (Id) {
          case "1":
            this.Branchname = "Trinity House";
            console.log(this.Branchname);
            break;
          case "2":
            this.Branchname = "White House";
            console.log(this.Branchname);
            break;

          case "3":
            this.Branchname = "Novelty House";
            console.log(this.Branchname);
            break;
        
          default:
            break;
          
           
        }
        console.log(this.Branchname);
        return this.Branchname;
      }
}
