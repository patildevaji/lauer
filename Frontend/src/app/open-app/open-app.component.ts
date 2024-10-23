import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-open-app',
  templateUrl: './open-app.component.html',
  styleUrl: './open-app.component.css'
})
export class OpenAppComponent implements OnInit {
  jobsData: any[] = [];
  constructor(private profileService: ProfileService) { }
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
