import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './login-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginServiceService],
  
})
export class AppComponent implements OnInit {
  title = 'app';
  public location = "";
  public showbanner:boolean;
  constructor(private _router: Router) { 
    this.location= this._router.url;
    this.showbanner=false;
 }

 ngOnInit(){

  

 }

 routelocation(){

  this.location= this._router.url;
  console.log(this.location.toString);
  console.log("Hi");
  return this.location.toString;

 }
}
