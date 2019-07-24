import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AppService } from '../../../app.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-profile',
  templateUrl: 'view-profile.page.html',
  styleUrls: ['view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  constructor(
    private events: Events,
    private spinnerDialog: SpinnerDialog,
    private appService: AppService
  ) { }
  ngOnInit() {
    this.spinnerDialog.show();
  }

}
