import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrl: './addjob.component.css'
})
export class AddjobComponent {

  jobsData: any[] = [];
  newJob: any = {};
  
  
  constructor(private profileService: ProfileService, private http: HttpClient) { }
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

  toggleEditMode(index: number) {
    this.jobsData[index].isEditing = !this.jobsData[index].isEditing;
    console.log('i am in toggle edit');
    this.saveJob(index);
  }

  
  saveJob(index: number) {
    const editedJob = this.jobsData[index];
    console.log(editedJob);
    this.profileService.updateJob(editedJob).subscribe({
      next: response => {
        console.log('Job updated successfully:', response);
      this.jobsData[index] = response.updatedJob; 
      },
      error: error => {
        console.error('Error submitting form:', error);
      }
    });
  }

  

  addNewJob() {
    console.log(this.newJob);
    this.profileService.postNewJob(this.newJob).subscribe({
      next: response => {
        this.jobsData.push(response.job);
        this.newJob = {};
        console.log( response);
      },
      error: error => {
        console.error('Error submitting form:', error);
      }
    });
  }

  
}
