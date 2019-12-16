import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../../app.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class ListAgendaComponent implements OnInit {
  adgList: any = [];
  constructor(
    private fb: FormBuilder,
    public alertCtrl: AlertController,
    private navCtrl: NavController,
    private appService: AppService,
    private route: ActivatedRoute
  ) { }
 
  ngOnInit() {
    // this.loadAdgenda();
  }
  ionViewDidEnter() {
    this.loadAdgenda();
  }

  loadAdgenda() {
    this.appService.get_adgendaList().subscribe((res: any) => {
      this.adgList = res;
    });
  }
  search(event) {
    console.log(event);
  }
  viewAgenda(id) {
    this.navCtrl.navigateForward(`calendar-details/${id}`);
  }

  editAgenda(id) {
    this.navCtrl.navigateForward(`adgenda/${id}`);
  }

  createAgenda() {
    this.navCtrl.navigateForward('new-adgenda');
  }
  deleteAgenda(id) {
    this.appService.delete_adgenda(id).subscribe((res) => {
      this.loadAdgenda();
    });
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertCtrl.create({
      message: 'Delete',
      buttons: [
        {
          text: 'Cancel',
          handler: (blah) => {}
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteAgenda(id);
          }
        }
      ]
    });

    await alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      const id = this.route.snapshot.params.id;
      this.loadAdgenda();
      event.target.complete();
    }, 2000);
  }
}
