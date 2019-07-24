import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events, NavController } from '@ionic/angular';
import { AppService } from '../app.service';
import * as _ from 'lodash';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-set-password',
  templateUrl: 'set-password.page.html',
  styleUrls: ['set-password.page.scss'],
})
export class SetPasswordPage implements OnInit, OnDestroy {
  fgroup: FormGroup;
  toastMessage = '';
  userInfo: any;
  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private events: Events,
    private toaster: ToastController,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.creatForm();
    const userInfo = localStorage.getItem('gmailCredencial');
    this.toastMessage = JSON.stringify(userInfo);
    if (_.isEmpty(userInfo)) {
      this.navCtrl.navigateForward('/login');
    }
  }

  async presentToast(message) {
    const toast = await this.toaster.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  creatForm() {
    this.fgroup = this.fb.group(
      {
        password: ['', [Validators.required]],
        conf_password: ['', [Validators.required]]
      });
  }
  onError(error) {
    this.presentToast(error);
    this.navCtrl.navigateBack('/login');
  }

  save() {
    if (this.fgroup.value.password !== this.fgroup.value.conf_password) {
      const message = 'Password not matched';
      this.presentToast(message);
    } else {
      const o = localStorage.getItem('gmailCredencial');
      this.userInfo = JSON.parse(o);
      const body = {
        username: this.userInfo.email,
        password: this.fgroup.value.password,
        email: this.userInfo.email,
        first_name: this.userInfo.first_name,
        last_name: this.userInfo.last_name
      };
      alert('test 1')
      this.appService.post_loginWithGmail(body).subscribe((res) => {
        this.login(body);
        alert('test 2')
      // this.navCtrl.navigateRoot('/login');
      });
    }
  }

  login(user) {
    this.appService.queryLogin(user)
    .subscribe(
      (res: any) => {
        alert('test 4')
        localStorage.setItem('ien_token', res.token);
        this.navCtrl.navigateRoot(`tabs/(tab1:tab1)`);
        this.events.publish('user', { login: true });
        const message = 'Successful Register';
        this.presentToast(message);
      },
      (error) => {
        this.onError(error);
      }
    );
  }

  ngOnDestroy() {
    console.log('distried');
  }
}

export class SetPasswordModel {
  username: String;
  psssword: String;
  email: String;
  first_name: String;
  last_name: String;
  picture: String;
}
