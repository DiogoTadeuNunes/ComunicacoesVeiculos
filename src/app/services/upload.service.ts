import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) {

  }

  public upload(formData) {

	return this.httpClient.post<any>(environment.UrlApiBase, formData, {  
      reportProgress: true,  
      observe: 'events'  
    });  
  }
}
