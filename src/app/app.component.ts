import { Component } from '@angular/core';
import { Events, NavController, MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './screens/app.service';
import * as _ from 'lodash';
import { AuthService } from './screens/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  myInfo: any;
  imgUrl = 'assets/default-icon/camera-icon.png';
  // imgBaseUrl : string = `http://192.168.0.100/Projects/blog/public/file/user-pp`;
  public appPages =
    [
      { title: 'Profile', url: '/profile', icon: 'contact' },
      { title: 'Invite A Friend', url: '/invite-connection', icon: 'hand' },
      { title: 'Favourite', url: '/profile', icon: 'heart' },
      { title: 'Resources', url: '/profile', icon: 'bookmarks' },
      { title: 'Setting', url: '/profile', icon: 'settings' },
    ];

  constructor (
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private navCtrl: NavController,
    private appService: AppService,
    private authService: AuthService,
    private menueCtrl: MenuController,
  ) {
    this.initializeApp();
    events.subscribe('user', (user) => {
      this.initializeApp();
      this.listenToEvent();
    });
  }

  initializeApp() {
    this.splashScreen.hide();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.authService.hasValidToken()) {
        this.menueCtrl.enable(true);
        this.getUserDetails();
      } else {
        this.menueCtrl.enable(false);
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  getUserDetails() {
    this.appService.getUserDetails().subscribe(
      (res: any) => {
        this.userInfo(res);
      },
      (err) => {
        this.onError(err);
      });
  }

  userInfo(user): string {
    if (_.isEmpty(user.first_name) && _.isEmpty(user.last_name)) {
      this.myInfo = user.username;
    } else {
      this.myInfo = user.first_name + ' ' + user.last_name;
    }
    return this.myInfo;
  }

  onError(erro) {
    this.navCtrl.navigateRoot('/login');
    console.log(erro);
  }

  listenToEvent() {
    const token = localStorage.getItem('ien_token');
    this.events.subscribe('user', (user) => {
      if (_.isEmpty(token) && !user.login) {
        this.menueCtrl.enable(false);
        this.navCtrl.navigateRoot('/login');
      } else {
        this.menueCtrl.enable(true);
        this.getUserDetails();
      }
    });
  }
  logOut() {
    localStorage.removeItem('ien_token');
    this.menueCtrl.enable(false);
    this.navCtrl.navigateRoot('slider');
  }
}
