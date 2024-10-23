import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  submitFormData(data: any) {
    return this.http.post<any>('http://localhost:3001/api/ats/createUser', data);
  }

  fetchUserDetails(data: any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   return this.http.get<any>('http://localhost:3001/api/ats/getUserID',  { headers: headers, params: data });
  }

  updateUserDetails(formData: any ): Observable<any>  {
   return this.http.post<any>('http://localhost:3001/api/ats/updateUserProfile',  { formData });
  }

  updatePasswordDetails(formData: any ): Observable<any>  {
   return this.http.post<any>('http://localhost:3001/api/ats/updateUserPassword',  { formData });
  }

  fetchJobsDetails()  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   return this.http.get<any>('http://localhost:3001/api/ats/getJobsDetails',  { headers: headers });
  }

  updateJob(jobsData: any): Observable<any>{
    console.log(JSON.stringify(jobsData) +' in service ');
    console.log(JSON.stringify({jobsData }));
    return this.http.put<any>('http://localhost:3001/api/ats/updateJob',  { jobsData });
  }

  postNewJob(newJob: any): Observable<any>{
    return this.http.post<any>('http://localhost:3001/api/ats/postNewJob',   newJob );
  }



}

