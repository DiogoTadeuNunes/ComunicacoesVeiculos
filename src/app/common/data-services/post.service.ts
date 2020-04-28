import { Post } from './../../models/post';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class PostService {

    _api: string;
    _projectKey: string;
    _list: string;
    _get: string;

    constructor(private router: Router,
                private http: HttpClient) {

      this._api = '/api/file';
      this._projectKey = 'HubVeiculos';
      this._list = '/list-postages?projectKey=HubVeiculos&createdAt=';
      this._get = '/get-postage?projectKey=HubVeiculos';
    }

    insert(dado: Post): any {
      return this.http.post(environment.UrlApiBase + this._api, dado, );
    }

    update(id: number, dado: Post): any {
      return this.http.put(environment.UrlApiBase + this._api + "/" + id, dado);
    }

    delete(id: number, projectKey: string): any {
      return this.http.delete(environment.UrlApiBase + this._api + "/" + id + "/" + projectKey);
    }

    list(createdAt: string): Observable<any> {
      return this.http.get<any>(environment.UrlApiBase + this._api + this._list + createdAt);
    }

    get(id: number): Observable<any> {
      return this.http.get<any>(environment.UrlApiBase + this._api + "/" + id + this._get);
    }
}
