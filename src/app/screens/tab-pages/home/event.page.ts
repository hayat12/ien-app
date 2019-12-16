import { Component, OnInit, OnChanges } from '@angular/core';
import { Events, NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Location } from '@angular/common';
import { MONTHS } from './event.constand';
import { DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss'],
})
export class EventPage implements OnInit, OnChanges{
  event_list: any = [];
  currentMonth: any;
  isEditable = false;
  readonly APP_DEFAULT_ICON = DefaultIcon;
  constructor(
    private events: Events,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private appService: AppService,
    private location: Location,
    private modal: ModalController,
    private navCtrl: NavController) {
      events.subscribe('user:created', (user, time) => {
        console.log('Welcome', user, 'at', time);
      });
  }

  ionViewWillEnter() { // THERE IT IS!!!
    const mg = this.route.snapshot.params.mg;
    if (mg === 'mg') {
      this.isEditable = true;
      this.listMyEvent();
      this.loadAttendingEvents();
    } else {
      this.isEditable = false;
      this.listEvent();
    }
  }

  ngOnChanges(){
    console.log('Updated');
  }

  ngOnInit() {
    // const mg = this.route.snapshot.params.mg;
    // if (mg === 'mg') {
    //   this.listMyEvent();
    // } else {
    //   this.listEvent();
    // }
  }

  search(ev) {
    const data = ev.target.value;
    if (data.length > 1) {
      this.searchEvents(data);
    } else {
      this.searchEvents('');
    }
  }

  searchEvents(term) {
    this.appService.get_searchEvent(term, this.isEditable).subscribe((res) => {
      this.event_list = res;
    });
  }

  listEvent() {
    this.appService.get_globalEvent().subscribe(
      (res: any) => {
        this.event_list = res;
      },
      (err) => {
        console.log(err);
        this.location.back();
      });
  }

  listMyEvent() {
    this.appService.get_listEvent().subscribe(
      (res: any) => {
        this.event_list = res;
      },
      (err) => {
        console.log(err);
        this.location.back();
      });
  }

  toEventDetails(eventData) {
    this.navCtrl.navigateForward(`/event-details/${eventData.id}/mg`);
  }
  toAddNewEvent() {
    this.navCtrl.navigateForward('/create-event');
  }

  blankImage(img) {
    let mg = null;
    if (_.isEmpty(img)) {
      mg = this.APP_DEFAULT_ICON.EVENT_IMAGE;
    } else {
      mg = img;
    }
    return mg;
  }
  doRefresh(event) {
    setTimeout(() => {
      const mg = this.route.snapshot.params.mg;
      if (mg === 'mg') {
        this.listMyEvent();
      } else {
        this.listEvent();
      }
      event.target.complete();
    }, 2000);
  }

  async presentAlertConfirm(id, action) {
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
            this.deleteEvent(id);
          }
        }
      ]
    });

    await alert.present();
  }

  toEdit(id) {
    this.navCtrl.navigateForward(`edit-event/${id}`);
  }

  deleteEvent(id) {
    this.appService.delete_event(id).subscribe( (res) => {
      const mg = this.route.snapshot.params.mg;
      if (mg === 'mg') {
        this.listMyEvent();
      } else {
        this.listEvent();
      }
    });
  }

  toAttend(id) {
    this.navCtrl.navigateForward(`attend/${id}`);
  }

  loadAttendingEvents(){
    this.appService.get_listAttending().subscribe((res)=>{
      console.log(res);
    });
  }
}
