import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/screens/app.service';
import { DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.page.html',
  styleUrls: ['./market-place.page.scss'],
})
export class MarketPlacePage implements OnInit {
  marketPlacesList = [];
  readonly APP_DEFAULT_ICON = DefaultIcon;
  constructor(
    private navCtrl: NavController,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.loadMaketPlaces();
  }

  ionViewDidEnter() {
    this.loadMaketPlaces();
  }

  loadMaketPlaces() {
    this.appService.get_ListmarketPlace().subscribe((res: any) => {
      this.marketPlacesList = res;
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadMaketPlaces();
      event.target.complete();
    }, 2000);
  }

  addMarketPlace() {
    this.navCtrl.navigateForward('add-market-place');
  }
  editMarketPlace(o) {
    // this.navCtrl.navigateForward(`edit-market-place/${o.id}`);
    this.navCtrl.navigateForward(`view-market-place/${o.id}`);
  }

  search(event) {
    const term  = event.target.value;
    this.appService.get_search_marketPlace(term).subscribe((res: any) => {
      this.marketPlacesList = res;
    });
  }

  blankImage(url) {
    let lb = null;
    if (_.isEmpty(url)) {
      lb = this.APP_DEFAULT_ICON.PROFILE_PICTURE;
    } else {
      lb = url;
    }
    return lb;
  }
}
