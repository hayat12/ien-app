import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AppService } from '../../app.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { AppConstant, DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  fgroup: FormGroup;
  myInfo = '';
  userImage = '';
  userDetails: any = [];
  records = [];
  points = 0;
  moduleNameTabs = [
    {
      id: 1,
      name: 'Manage Events',
      icon: 'paper'
    },
    {
      id: 2,
      name: 'Manage Agenda',
      icon: 'calendar'
    },
    {
      id: 3,
      name: 'Manage Market Place',
      icon: 'cube'
    }
  ];
  imgUrl: String = 'assets/default-icon/camera-icon.png';
  readonly APP_CONSTANT = AppConstant;
  readonly APP_DEFAULT_ICONS = DefaultIcon;
  constructor(
    private spinnerDialog: SpinnerDialog,
    private appService: AppService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getUserDetails();
    this.getPoints();
    // this.countRecords(res.id);
  }

  getUserDetails() {
    this.spinnerDialog.show();
      this.appService.getUserDetails().subscribe(
        (res: any) => {
          console.log(res);
          this.userDetails = res;
          this.userInfo(res);
          this.spinnerDialog.hide();
        },
        (err) => {
          this.navCtrl.navigateRoot('/login');
          this.spinnerDialog.hide();
        } );
  }

  createProfile() {
    this.navCtrl.navigateForward('create-profile');
  }

  toCompany() {
    this.navCtrl.navigateForward('create-company');
  }

  userInfo(user): String {
    if (_.isEmpty(user.first_name) && _.isEmpty(user.last_name)) {
      this.myInfo = user.username;
    } else {
      this.myInfo = user.first_name + ' ' + user.last_name;
    }
    return this.myInfo;
  }

  manageAgenda() {
    // this.navCtrl.navigateForward('new-adgenda');
    this.navCtrl.navigateForward('agenda-list');
  }

  manageEvent(o, idx) {
    if (o === 1) {
      this.navCtrl.navigateForward('events/mg');
    } else if (o === 2) {
      this.manageAgenda();
    } else {
      this.manageMarketPlaces();
    }
  }
  manageMarketPlaces() {
    this.navCtrl.navigateForward('market-place/mg');
  }
 
  blankImage(img) {
  let lb = '';
  if (_.isEmpty(img)) {
    lb = this.APP_DEFAULT_ICONS.PROFILE_PICTURE;
  } else {
    lb = img;
  }
    return lb;
  }
  countRecords(id){
    this.appService.get_records(id).subscribe((res: any) => {
      this.records = res;
    });
  }

  getPoints(){
    this.points = 10;
  }
}
