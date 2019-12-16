import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';
import * as _ from 'lodash';
import { DefaultIcon } from 'src/app/app.constant';
@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.page.html',
  styleUrls: ['./calendar-detail.page.scss'],
})
export class CalendarDetailPage implements OnInit {
  agenda: any;
  invitedList = [];
  readonly APP_DEFAULT_ICON = DefaultIcon.PROFILE_PICTURE;
  constructor(
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private appService: AppService,
    private navCtrl: NavController) { }

  ngOnInit() {
    const adgId = this.route.snapshot.params.id;
    this.getAgenda(adgId);
    this.loadConnections(adgId);
  }

  getAgenda(id) {
  this.appService.get_adgenda(id).subscribe( (res: any) => {
      this.agenda = res;
  });
  }

  async presentAlertConfirm() {
    const adgId = this.route.snapshot.params.id;
    const alert = await this.alertCtrl.create({
      message: 'Delete',
      buttons: [
        {
          text: 'Edit',
          handler: (blah) => {
            this.editAgenda(adgId);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteAgenda(adgId);
          }
        }
      ]
    });

    await alert.present();
  }
  loadConnections(id) {
    this.appService.get_joinedAgenda(id).subscribe( (res: any) => {
      this.invitedList = res;
    });
  }
  deleteAgenda(id) {
    this.appService.delete_adgenda(id).subscribe((res) => {
      this.navCtrl.navigateForward(`/tabs/(tab2:tab2)`);
    });
  }

  editAgenda(id) {
    this.navCtrl.navigateForward(`/adgenda/${id}`);
  }

  blankImg(img){
    let mg = null;
    if (_.isEmpty(img)) {
      mg = this.APP_DEFAULT_ICON;
    } else {
      mg = img
    }
  return mg;
  }

  blankName(user){
    let usr = null;
    if (_.isEmpty(user.first_name)) {
      usr = user.first_name;
    } if (_.isEmpty(user.last_name)) {
      usr = user.last_name
    }else{
      usr = user.email;
    }
  return usr;
  }

  joinNow(){
    const adgId = this.route.snapshot.params.id;
    this.appService.joinAgenda(adgId).subscribe((res: any)=>{
      if (res.exist == true) {
        const adgId = this.route.snapshot.params.id;
        this.loadConnections(adgId)
        this.presentToast('You already join to this agenda');
      } else {
        this.presentToast('You have successfully joined to the agenda');
      }
    })
  }
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
