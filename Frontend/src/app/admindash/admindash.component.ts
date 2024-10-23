import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var handleSignout: any;

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrl: './admindash.component.css'
})
export class AdmindashComponent implements OnInit {
  myVarA = true;
  myVarB = false;
  myVarC = false;
  myVarD = false;

  constructor(private router: Router) {}
  
  ngOnInit() {
    
  }
 
showHideA() {

  this.myVarA = true;
  this.myVarB = false;
  this.myVarC = false;
  this.myVarD = false;

};
showHideB() {

  this.myVarA = false;
  this.myVarB = true;
  this.myVarC = false;
  this.myVarD = false;

};
showHideC() {

  this.myVarA = false;
  this.myVarB = false;
  this.myVarC = true;
  this.myVarD = false;

};
showHideD() {

  this.myVarA = false;
  this.myVarB = false;
  this.myVarC = false;
  this.myVarD = true;

};
  handleSignOut() {
    this.router.navigateByUrl('/home');
    };
}

