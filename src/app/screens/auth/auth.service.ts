import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {
  }
  getToken(): string {
    return localStorage.getItem('ien_token');
  }

  hasValidToken(): boolean {
    return !!this.getToken();
  }

}
