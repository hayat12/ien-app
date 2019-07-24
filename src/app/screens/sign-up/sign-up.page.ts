import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NavController, ToastController } from '@ionic/angular';
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
    username: data.username,
    password: data.password
  };
  const validEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(user.username);
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
          const message = 'you have successfully registered ';
          this.presentToast(message);
          this.navCtrl.navigateRoot('login');
      }, ( err ) => {
        this.onError(err);
      });
  }
}

LoginWithGoogle() {
  this.googlePlus.login({}).
    then((res) => {
      const token = res.accessToken;
      localStorage.setItem('gmail-token', token);
      this.navCtrl.navigateForward(`set-password`);
    })
    .catch(err => {
      const message = 'somethings went wrong';
      this.presentToast(message);
      console.log(err);
    });
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
  console.log(error);
}
}
