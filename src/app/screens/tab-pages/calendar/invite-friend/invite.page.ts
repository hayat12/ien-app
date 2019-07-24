import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events, NavController } from '@ionic/angular';
import * as _ from 'lodash';
import { AppService } from 'src/app/screens/app.service';
@Component({
  selector: 'app-invite',
  templateUrl: 'invite.page.html',
  styleUrls: ['invite.page.scss'],
})
export class InvitePage implements OnInit {
  invitesList = [];
  selectedConnList = [];

  constructor(
    private events: Events,
    private appService: AppService,
    private fb: FormBuilder,
    private navCtrl: NavController,
  ) { }
  ngOnInit() {
    // this.loadInvitesPP();
  }
  ionViewWillEnter() { // THERE IT IS!!!
    this.loadInvitesPP();
}
  loadInvitesPP() {
    this.appService.get_connections().subscribe((res: any) => {
      this.invitesList = res;
    });
  }

  selectConnection(conn) {
    const i = _.findIndex(this.selectedConnList, (k) => {
      return k.id === conn.id;
    });
    if (i >= 0) {
      _.remove(this.selectedConnList, function(n) {
        return n.id  === conn.id;
      });
    } else {
      this.selectedConnList.push(conn);
    }
  }

  inviteNow() {
    localStorage.setItem('invite-pp', JSON.stringify(this.selectedConnList));
    this.navCtrl.navigateForward('new-adgenda');
  }

  blankInfo(info) {
    let lp = null;
    if (!_.isEmpty(info.first_name)) {
      lp = info.first_name;

    } else if (!_.isEmpty(info.last_name)) {
      lp = info.last_name;
    } else {
      lp = info.username;
    }
    return lp;
  }
}
