import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = "";
  username: string = "";
  password: string = "";
  cpassword: string ="";


  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

  }

  handleSignOut() {
    this.router.navigateByUrl('/login');
  };

  register() {
    let bodyData = {
      "email": this.email,
      "username": this.username,
      "password": this.password,
      "cpassword" : this.cpassword,
    };
    this.http.post("http://localhost:3001/register", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Registered Successfully");


      // this.email = '';
      // this.username = '';
      // this.password  = '';
      // this.cpassword  = '';
    });
  }
  save() {
    this.register();
  }

}

