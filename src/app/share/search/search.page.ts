import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { AppService } from 'src/app/screens/app.service';
import { DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage implements OnInit {
  fgroup: FormGroup;
  readonly APP_DEFAULT_ICON = DefaultIcon.PROFILE_PICTURE;
  items: [];
  constructor(
    // private appService: AppService,
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private service: AppService
  ) { }
  ngOnInit() {
    this.loadData(' ');
  }

  search(data: string) {
    if (data.length > 1) {
      this.loadData(data);
    } else {
      this.loadData(' ');
    }
  }

  loadData(keyword: string) {
    if (keyword === null) {
      this.service.querySearch(keyword = '').subscribe((res) => {
        this.onSuccess(res);
      }, (error) => {
        this.onError(error);
      });
    } else {
      this.service.querySearch(keyword).subscribe((res) => {
        this.onSuccess(res);
      }, (error) => {
        this.onError(error);
      });
    }
  }
  viewEvent(event_id) {
    this.navCtrl.navigateForward(`/event-details/${event_id}`);
  }

  onSuccess(res) {
    this.items = res;
  }
  onError(error) {
    console.log(error);
  }

  eventBlankPage(img) {
    let b = null;
    if (_.isEmpty(img)) {
      b = this.APP_DEFAULT_ICON;
    } else {
      b = img;
    }
    return b;
  }
}
