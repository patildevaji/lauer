import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent { 

  
  constructor( private sharedDataService: SharedDataService, private profileService: ProfileService) {
    
    this.sharedDataService.setSharedVariableIN(true);
    this.sharedDataService.setSharedVariableOUT(false);
    console.log(this.sharedDataService.getSharedVariableIN() + '4in');
    console.log(this.sharedDataService.getSharedVariableOUT() + '4out');
  }

  jobsData: any[] = [];
  
  ngOnInit(): void {
    this.fetchJobsDetails();
  }

  fetchJobsDetails() {
    this.profileService.fetchJobsDetails().subscribe((response: any) => {
      this.jobsData = response;
      console.log( this.jobsData +'this is jobs data');
      console.log( JSON.stringify(this.jobsData) +'this is stringed jobs data');
    });
  }
  

}
