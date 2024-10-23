import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  myVarIN = true;
  myVarOUT = false;
  sharedVariableIN = true;
  sharedVariableOUT = false;
  subscription!: Subscription;


  constructor(private sharedDataService: SharedDataService) { 
    this.sharedVariableIN = true;
    this.sharedVariableOUT = false;
    
console.log(this.sharedVariableIN + 'hi here in header in  ');
console.log(this.sharedVariableOUT + 'hi here in header out');
    this.sharedVariableIN = this.sharedDataService.getSharedVariableIN();
    this.sharedVariableOUT = this.sharedDataService.getSharedVariableOUT();

    this.subscription = this.sharedDataService.sharedVariableChangeIN.subscribe(value => {
      // Do something when variable changes
      this.sharedVariableIN = value;
      console.log('Variable changed in Component 1:', value);
  })

  this.subscription = this.sharedDataService.sharedVariableChangeOUT.subscribe(value => {
    // Do something when variable changes
    this.sharedVariableOUT = value;
    console.log('Variable changed in Component 1:', value);
})

console.log(this.sharedVariableIN + 'hi here in header in  ');
console.log(this.sharedVariableOUT + 'hi here in header out');

};



  // showHideButtonIN(){
  //   this.myVarIN = true;
  //   this.myVarOUT = false;
  // }
  showHideButtonOUT(){
    this.sharedVariableIN = false;
    this.sharedVariableOUT = true;
  }

  showHideButtonIN(){
    this.sharedVariableIN = true;
    this.sharedVariableOUT = false;
  }

}

