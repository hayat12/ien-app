import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AppService } from 'src/app/screens/app.service';
import { DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.page.html',
  styleUrls: ['./market-place.page.scss'],
})
export class MarketPlacePage implements OnInit {
  marketPlacesList = [];
  readonly APP_DEFAULT_ICON = DefaultIcon;
  isEditable = false;
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    // const prm = this.route.snapshot.params.mg;
    // if (!_.isEmpty(prm)) {
    //   this.isEditable = true;
    //   this.loadMaketPlaces(true);
    // } else {
    //   this.loadMaketPlaces(false);
    // }
  }

  ionViewDidEnter() {
    const prm = this.route.snapshot.params.mg;
    if (!_.isEmpty(prm)) {
      this.isEditable = true;
      this.loadMaketPlaces(true);
    } else {
      this.loadMaketPlaces(false);
    }
  }

  loadMaketPlaces(isEditable) {
    this.appService.get_ListmarketPlace(isEditable).subscribe((res: any) => {
      this.marketPlacesList = res;
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadMaketPlaces(this.isEditable);
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
    this.appService.get_search_marketPlace(term, this.isEditable).subscribe((res: any) => {
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

  toEdit(id){
    this.navCtrl.navigateForward(`edit-market-place/${id}`);
  }

  async presentAlertConfirm(id) {    
    const alert = await this.alertCtrl.create({
      header: 'Delete!',
      message: 'Confirm to delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteMKP(id);
          }
        }
      ]
    });

    alert.present();
  }
    deleteMKP(id){
      this.appService.delete_marketPlace(id).subscribe((res)=>{
        this.navCtrl.goBack();
      });
    }
}
