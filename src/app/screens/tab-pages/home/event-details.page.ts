import { Component, OnInit } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
import { PopoverPage } from 'src/app/share/components/pop-over.page';
import { PopOver, Methods } from 'src/app/share/components/popover.model';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-event-details',
  templateUrl: 'event-details.page.html',
  styleUrls: ['event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: any = [];
  isEditable = false;
  formgroup: FormGroup;
  readonly  methods = Methods;
  readonly APP_DEFAULT_ICON = DefaultIcon;
  constructor(
    private appService: AppService,
    public popoverController: PopoverController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private navCtrl: NavController) {
  }

  ngOnInit() {
    const eventId = this.route.snapshot.params.id;
    const mg = this.route.snapshot.params.mg;
    if (mg !== 'mg') {
      this.isEditable = true;
    } else {
      this.isEditable = false;
    }
    this.getEvent(eventId);
  }

  async presentPopover(ev: any) {
    const eventId = this.route.snapshot.params.id;
    const entity: PopOver = Object.assign({}, {id: eventId, method: this.methods.DELETE});
    const popover = await this.popoverController.create(
      {
        component: PopoverPage,
        componentProps: entity,
        event: ev,
        translucent: true,
        backdropDismiss: true
      }
      );
    return await popover.present();
  }

  getEvent(eventId) {
    this.appService.get_event(eventId).subscribe(
      (res) => {
        this.event = res[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTicket() {
    const eventId = this.route.snapshot.params.id;
    this.appService.get_getTicket(eventId).subscribe((res) => {
      this.presentToast('You have successfully booked a teckit');
      // this.navCtrl.goBack();
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      const eventId = this.route.snapshot.params.id;
      this.getEvent(eventId);
      event.target.complete();
    }, 2000);
  }

  eventBlankPage(img) {
    let b = null;
    if (_.isEmpty(img)) {
      b = this.APP_DEFAULT_ICON.EVENT_IMAGE;
    } else {
      b = img;
    }
    return b;
  }

  blankImage(url, id) {
    let lb = null;
    if (_.isEmpty(url)) {
      lb = this.APP_DEFAULT_ICON.PROFILE_PICTURE;
    } else {
      lb = url;
    }
    return lb;
  }
  
  toEdit(event) {
    this.navCtrl.navigateForward(`edit-event/${event.id}`);
  }
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
