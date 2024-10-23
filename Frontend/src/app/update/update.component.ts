import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  formData = {
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }
  constructor(private profileService: ProfileService) { }
  submitForm() {
    this.profileService.updatePasswordDetails(this.formData).subscribe({
      next: response => {
        console.log('Form submitted successfully:', response);
        // Reset the form after successful submission
      },
      error: error => {
        console.error('Error submitting form:', error);
      }
    });
  }
}
