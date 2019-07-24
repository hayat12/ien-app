import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    getToken(): string {
        return localStorage.getItem('ien_token');
        // return this.token;
      }
}
