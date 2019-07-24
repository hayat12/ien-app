import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.page.html',
  styleUrls: ['./calendar-detail.page.scss'],
})
export class CalendarDetailPage implements OnInit {
  agenda: any;
  invitedList = [];
  constructor(
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    private appService: AppService,
    private navCtrl: NavController) { }

  ngOnInit() {
    const adgId = this.route.snapshot.params.id;
    this.getAgenda(adgId);
    // this.loadConnections(adgId);
  }

  getAgenda(id) {
  this.appService.get_adgenda(id).subscribe( (res: any) => {
    if (res.length > 0) {
      this.agenda = res[0];
    } else {
      this.navCtrl.navigateForward(`/tabs/(tab2:tab2)`);
    }
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
    this.appService.get_connection(id).subscribe( (res: any) => {
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
}
