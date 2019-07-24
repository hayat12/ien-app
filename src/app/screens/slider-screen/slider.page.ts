import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NavController } from '@ionic/angular';
import { AppService } from '../app.service';

@Component({
  selector: 'app-slider',
  templateUrl: 'slider.page.html',
  styleUrls: ['slider.page.scss']
})
export class SliderPage {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private appService: AppService,
  ) {
    console.log(this.authService.hasValidToken());
    if (this.authService.hasValidToken()) {
      this.navCtrl.navigateRoot('/tabs/(tab1:tab1)');
    } else {
      // this.appService.logOut();
      this.navCtrl.navigateRoot('/slider');
    }
  }


  login() {
    this.router.navigateByUrl('login');
  }
  signUp() {
    this.router.navigateByUrl('sign-up');
  }
}
