import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private sharedVariableIN = true  ;
  private sharedVariableOUT = false;
  sharedVariableChangeIN: Subject<any> = new Subject<any>();
  sharedVariableChangeOUT: Subject<any> = new Subject<any>();
  constructor() {
    console.log(this.sharedVariableIN + '2in');
    console.log(this.sharedVariableOUT + '2out');
   }
  setSharedVariableIN(data: any) {
    this.sharedVariableIN = data;
    this.sharedVariableChangeIN.next(data);
  }

  getSharedVariableIN() {
    return this.sharedVariableIN;
  }
  setSharedVariableOUT(data: any) {
    this.sharedVariableOUT = data;
    this.sharedVariableChangeOUT.next(data);
  }

  getSharedVariableOUT() {
    return this.sharedVariableOUT;
  }
}
