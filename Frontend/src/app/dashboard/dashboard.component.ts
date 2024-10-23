import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var handleSignout: any;
import { SharedDataService } from '../shared-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  myVarA = true;
  myVarB = false;
  myVarC = false;
  myVarD = false;

  // sharedVariableIN = true;
  // sharedVariableOUT = true;
  constructor(private router: Router, private sharedDataService: SharedDataService) {
    
    this.sharedDataService.setSharedVariableIN(false);
    this.sharedDataService.setSharedVariableOUT(true);
    console.log(this.sharedDataService.getSharedVariableIN() + '3in');
    console.log(this.sharedDataService.getSharedVariableOUT() + '3out');
  }
  
  
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
