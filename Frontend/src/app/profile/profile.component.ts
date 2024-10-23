import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { ProfileService } from '../services/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  isEditMode: boolean = false;
  data: any;



  formData = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    city: '',
    plz: '',
    linkedin: '',
    image: ''

  }

  constructor(private profileService: ProfileService, private cookieService: CookieService) { }
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const email = this.cookieService.get('email');

    const requestBody = { email: email };
    this.profileService.fetchUserDetails(requestBody).subscribe((response: any) => {
      this.data = response;
      this.formData.firstname = response.firstname;
      this.formData.lastname = response.lastname;
      this.formData.email = response.email;
      this.formData.phone = response.phone;
      this.formData.country = response.country;
      this.formData.address = response.address;
      this.formData.city = response.city;
      this.formData.plz = response.plz;
      this.formData.linkedin = response.linkedin;
      this.formData.image= response.image;

    });
  }

  handleButtonClick() {
    if (this.isEditMode) {
      this.submitForm(); // Call submitForm function if in "Save" mode
    } else {
      this.toggleEditMode(); // Call toggleEditMode function if in "Edit" mode
    }
  }

  submitForm() {
    console.log(this.formData);
    this.profileService.updateUserDetails(this.formData).subscribe({
      next: response => {
        console.log('Form submitted successfully:', response);
        this.toggleEditMode();
        // Reset the form after successful submission
      },
      error: error => {
        console.error('Error submitting form:', error);
      }
    });
  }
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }


  
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Check if reader.result is not null before assigning it
        if (reader.result !== null) {
          // Cast reader.result to string
          this.formData.image = reader.result as string;
        }};
    }
  }

}
