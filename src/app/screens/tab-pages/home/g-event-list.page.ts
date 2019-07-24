import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/screens/app.service';
import { ActivatedRoute } from '@angular/router';
import { DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
@Component({
  selector: 'app-event-list',
  templateUrl: './g-event-list.page.html',
  styleUrls: ['./g-event-list.page.scss'],
})
export class GlobalEventList implements OnInit {
  readonly APP_DEFAULT_ICON = DefaultIcon;
  event_list = [];
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.listMyEvent();
  }

  doRefresh(event) {
    event.target.complete();
  }

  listMyEvent() {
    this.appService.get_globalEvent().subscribe(
      (res: any) => {
        this.event_list = res;
      },
      (err) => {
        console.log(err);
        // this.location.back();
      });
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

  viewEvent(events) {
    this.navCtrl.navigateForward(`event-details/${events.id}`);
  }
  search(event) {
    console.log(event);
  }
}
