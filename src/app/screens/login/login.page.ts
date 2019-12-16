import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Events, NavController, ToastController } from '@ionic/angular';
import { AppService } from '../app.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  fgroup: FormGroup;
  message: string;
  info: any;
  haseError = false;
  constructor(
    private googlePlus: GooglePlus,
    private serivce: AppService,
    private events: Events,
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: ToastController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.creatForm();
    if (this.authService.hasValidToken()) {
      this.navCtrl.navigateRoot('tabs');
    } else {
      const o = localStorage.getItem('ien_token');
      if (o) {
        localStorage.removeItem('ien_token');
        this.events.publish('user', { login: false });
      }
    }
  }

  creatForm() {
    this.fgroup = this.fb.group({ username: [''], password: [''] });
  }

  login() {
    const user = this.fgroup.value;
    this.serivce.queryLogin(user)
      .subscribe(
        (res: any) => {
          if (res.access_token != undefined) {
            localStorage.setItem('ien_token', res.access_token);
            this.navCtrl.navigateRoot(`tabs/(tab1:tab1)`);
            this.events.publish('user', { login: true });
            const message = "Successfully Logged In";
            this.presentToast(message);
          } else {
            this.onError('error');
          }
        }, (error) => {
          this.onError(error);
        }
      );
  }

  async presentToast(message) {
    const toast = await this.toaster.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  setMessage(message: string): string {
    return this.message = message;
  }

  LoginWithGoogle() {
    this.googlePlus.login({}).then((res) => {
      const o = {
        email: res.email,
        name: res.familyName,
        password: res.userId,
        password_confirmation: res.userId
      }
      this.serivce.loginWithGmail(o).subscribe((res: any) => {
        if (res.access_token != undefined) {
          localStorage.setItem('ien_token', res.access_token);
          this.navCtrl.navigateRoot(`tabs/(tab1:tab1)`);
          const message = "Successfully Logged In";
          this.presentToast(message);
          this.events.publish('user', { login: true });
        } else {
          this.onError('error');
        }
      })
    });
    //     const d = new Date();
    //     const password = Math.random().toString(36).substring(7);
    //     const body = {
    //       email: res.email,
    //       // first_name: res.givenName,
    //       // last_name: res.familyName,
    //       name: res.familyName,
    //       password: password,
    //       password_confirmation: password
    //     };
    //     this.serivce.loginWithGmail(body).subscribe((res: any) => {
    //       // localStorage.setItem('gmailCredencial', JSON.stringify(body));
    //       // const o = { 'user': body, message: 'Wecome', 'time': new Date };
    //       // localStorage.setItem('welcomeMsg', JSON.stringify(o));
    //       // // this.navCtrl.navigateForward(`set-password`);
    //       // const message = `${res.givenName} your registred with ${res.email}`;

    //       localStorage.setItem('ien_token', res.access_token);
    //       this.navCtrl.navigateRoot(`tabs/(tab1:tab1)`);
    //       this.events.publish('user', { login: true });
    //       this.presentToast(res);
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.onError(err);
    //   });
  }

  onError(error) {
    const message = 'Login failed';
    this.presentToast(message);
  }

}
