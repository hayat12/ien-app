import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NavController, ToastController, Events } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  fgroup: FormGroup;
constructor(
  private appService: AppService,
  private googlePlus: GooglePlus,
  private fb: FormBuilder,
  private events: Events,
  private router: Router,
  private toaster: ToastController,
  private navCtrl: NavController,
  ) {}
  ngOnInit() {
    this.creatForm();
    // this.appService.logOut();
  }
creatForm() {
  this.fgroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      con_password: ['']
    }
  );
}

SignUp(data) {
  const user = {
    email: data.username,
    password: data.password
  };
  const validEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(user.email);
  if (data.password !== data.con_password) {
    const message = 'Your Password not matched';
    this.presentToast(message);
  } else if (!validEmail) {
    const message = 'Username should be email only';
    this.presentToast(message);
  } else if (data.password.length < 8 || data.con_password.length < 8) {
    const message = 'Min length of password should be 8 char';
    this.presentToast(message);
  } else {
    this.appService.querySignUp(user).subscribe(
      (res: any) => {
        const message = "Successfully Logged In";
        this.presentToast(message);
          this.navCtrl.navigateRoot('login');
      }, ( err ) => {
        this.onError(err);
      });
  }
}

LoginWithGoogle() {
  this.googlePlus.login({}).then((res) => {
    const o = {
      email: res.email,
      name: res.familyName,
      password: res.userId,
      password_confirmation: res.userId
    }
    this.appService.loginWithGmail(o).subscribe((res:any) => {
      if (res.access_token != undefined) {
        localStorage.setItem('ien_token', res.access_token);
        this.navCtrl.navigateRoot(`tabs/(tab1:tab1)`);
        this.events.publish('user', { login: true });
        const message = "Successfully Logged In";
        this.presentToast(message);
      } else {
        this.onError('error');
      }
    })
  });
  // this.googlePlus.login({}).
  // then((res) => {
  //   const d = new Date();
  //   const password = Math.random().toString(36).substring(7);
  //   const body = {
  //     email: res.email,
  //     // first_name: res.givenName,
  //     // last_name: res.familyName,
  //     name: res.familyName,
  //     password: password,
  //     password_confirmation: password
  //   };
  //   this.appService.loginWithGmail(body).subscribe((res: any) => {
  //     // localStorage.setItem('gmailCredencial', JSON.stringify(body));
  //     // const o = { 'user': body, message: 'Wecome', 'time': new Date };
  //     // localStorage.setItem('welcomeMsg', JSON.stringify(o));
  //     // // this.navCtrl.navigateForward(`set-password`);
  //     // const message = `${res.givenName} your registred with ${res.email}`;

  //     localStorage.setItem('ien_token', res.access_token);
  //     this.navCtrl.navigateRoot(`tabs/(tab1:tab1)`);
  //     this.events.publish('user', { login: true });
  //     this.presentToast(res);
  //   })
  // })
  // .catch(err => {
  //   console.log(err);
  //   this.onError(err);
  // });
}

async presentToast(message) {
  const toast = await this.toaster.create({
    message: message,
    duration: 2000
  });
  toast.present();
}

onSuccess(res) {
  console.log(res);
  this.router.navigateByUrl('/login');
}
onError(error) {
  const message = 'Login failed';
  this.presentToast(message);
}
}
