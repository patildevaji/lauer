import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
 
  email: string = '';
  password: string = '';
 
  erroMessage: string = "";

  isLogin: boolean = true;

  constructor(private router: Router,private http: HttpClient, private cookieService: CookieService) {}

  handleSignOut() {
    this.router.navigateByUrl('/register');
    };

  login() {
    console.log(this.email);
    console.log(this.password);
    let bodyData = {
      email: this.email,
      password: this.password,
    };
        this.http.post("http://localhost:3001/login", bodyData).subscribe((resultData: any) => {
        console.log(resultData);
        console.log(resultData.accessToken);
        
        if (resultData.accessToken) {
          if (resultData.roles[1] == 1)
          {
            this.router.navigateByUrl('/admindash');
      
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        }

        else
         {
          alert("Incorrect Email or Password");
          //.log("Errror login");
        }
      });
    this.cookieService.set('email', this.email);
    }
 
}
