import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private navCtrl: NavController,
    private router: Router,
    public toastController: ToastController) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('ien_token');

    if (!_.isEmpty(token)) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
      // 'client_id': 'zB7J49B2oFiZB7Ok2ccu2gClwSCFzy7ZCJ8k6P0R',
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json',
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.success === false) {
            this.presentToast('Login failed');
          } else {
            this.navCtrl.navigateRoot('slider');
          }
        } else if (error.status === 401) {
          localStorage.removeItem('ien_token');
          this.navCtrl.navigateRoot('slider');
        }
        return throwError(error);
      }));
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
