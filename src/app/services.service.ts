  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  @Injectable({
    providedIn: 'root'
  })
  export class ServicesService {

    constructor(private http:HttpClient) { }


    postData(data: any): Observable<any> {
      return this.http.post('http://localhost:3000/students/post', data);
    }

    getData(): Observable<any> {
      return this.http.get('http://localhost:3000/students/get');
    }

    deleteData(id:any): Observable<any> {
      return this.http.delete(`http://localhost:3000/students/delete/${id}`);
    }

    updateData(id: any, data: any):Observable<any>{
      return this.http.put(`http://localhost:3000/students/update/${id}`,data);
    }

    sendMail(data:any):Observable<any>{
  return this.http.post(`http://localhost:3000/students/sendMail`,data);
    }

    searchNow(name:string):Observable<any>{
      return this.http.get(`http://localhost:3000/students/get/${name}`);
    }


  }
