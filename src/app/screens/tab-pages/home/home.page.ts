import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Events, NavController, Content, LoadingController } from '@ionic/angular';
import { AppService } from '../../app.service';
import { ScreenConstand } from '../../screen-constant';
import * as _ from 'lodash';
import { DefaultIcon } from 'src/app/app.constant';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  result: any = [];
  loading: any;
  adgList = [];
  userToken = null;
  market_place_list: any = [];
  event_list: any = [];
  new_list = [];
  timeList = [
    { id: 0, name: 'Morning', time: '0 - 11' },
    { id: 1, name: 'Afternoon', time: '12 - 13' },
    { id: 2, name: 'Evening', time: '13 - 0' }
  ];
  @ViewChild(Content)
  content: Content;
  readonly APP_DEFAULT_ICON = DefaultIcon.PROFILE_PICTURE;
  constructor(
    private navCtrl: NavController,
    public loadingController: LoadingController,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.get_eventList();
    this.loadMarketPlace();
  }

  ionViewWillEnter() { // THERE IT IS!!!
    this.refresher();
  }

  refresher() {
    setTimeout(() => {
      this.presentLoading();
      this.get_eventList();
      this.loadMarketPlace();
    }, 5000);
  }

  setWelcomeTime() {
    let wl = null;
    const m: Number = moment(new Date(), 'h:mm:ss A').hours();
    if (m < 11) {
      wl = this.timeList[0].name;
    } else if (m >= 11 && m < 13) {
      wl = this.timeList[1].name;
    } else {
      wl = this.timeList[2].name;
    }
    return wl;
  }

  blankPage(img) {
    let b = null;
    if (_.isEmpty(img)) {
      b = this.APP_DEFAULT_ICON;
    } else {
      b = img;
    }
    return b;
  }

  get_eventList() {
    this.appService.get_globalEvent().subscribe((res) => {
      this.event_list = res;
      // this.loading.dismiss();
    });
  }

  loadMarketPlace() {
    this.appService.get_ListmarketPlace(false).subscribe((res) => {
      this.market_place_list = res;
       this.loading.dismiss();
    });
  }

  getMarketPlace(token) {
    this.appService.queryMarketPlace(
      ScreenConstand.PAGE_SIZE.VERTICAL_PAGE_SIZE,
      token.ien_email).subscribe((res) => {
      });
  }

  getNews() { }

  doIt() {
    this.navCtrl.navigateForward('/profile');
  }
  viewAll() {
    this.navCtrl.navigateForward('/event');
  }

  goSearch() {
    this.navCtrl.navigateForward('/search');
  }

  viewAllMarketPlaces() {
    this.navCtrl.navigateForward('/market-place');
  }

  viewEvents() {
    this.navCtrl.navigateForward('/g-list');
  }

  viewEvent(event_id) {
    this.navCtrl.navigateForward(`/event-details/${event_id}`);
  }

  editMarketPlace(id) {
    this.navCtrl.navigateForward(`/view-market-place/${id}`);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.get_eventList();
      this.loadMarketPlace();
      event.target.complete();
    }, 2000);
  }

  marketPlaceBlankImage(url) {
    console.log('====================================');
    console.log(url);
    console.log('====================================');
    let lb = null;
    if (_.isEmpty(url)) {
      lb = this.APP_DEFAULT_ICON;
    } else {
      lb = url;
      return lb;
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('welcomeMsg');
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Wait...',
      duration: 5000
    });
    await this.loading.present();
  }
}

export class DayShow {
  constructor(myDate) {
    myDate = new Date();
  }
}
