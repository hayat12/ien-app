import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../app.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  fGroup: FormGroup;
  invitePPList: any = [];
  isEditMode = false;
  constructor (
    private fb: FormBuilder,
    private navCtrl: NavController,
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    // this.loadInvitePP();
    // const adgId = this.route.snapshot.params.id;
    // if (_.isEmpty(adgId)) {
    //   this.isEditMode = false;
    // } else {
    //   this.isEditMode = true;
    //   this.loadAdgenda(adgId);
    // }
  }

  ionViewWillEnter() {
    this.loadInvitePP();
    const adgId = this.route.snapshot.params.id;
    if (_.isEmpty(adgId)) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.loadAdgenda(adgId);
    }
  }
  loadAdgenda(id) {
    this.appService.get_adgenda(id).subscribe((res) => {
      this.patchformData(res);
    });
  }

  patchformData(data) {
    this.fGroup.patchValue(
      {
        title: data.title,
        notes: data.notes,
        address: data.address,
        start_date: data.start_date,
        start_time: data.start_time
      });
  }
  createForm() {
    this.fGroup = this.fb.group(
      {
        title: ['', [Validators.required]],
        notes: [],
        address: [],
        start_date: ['', [Validators.required]],
        start_time: ['', [Validators.required]]
      });
  }

  saveAdgenda(data) {
    const lst = JSON.parse(localStorage.getItem('invite-pp'));
    const t = data.start_time
    // const s = t.split(':');
    // const mins = s[1];
    // const hour = s[0];
    // const myDate = new Date(data.start_date); 
    // const strTime = moment(myDate).add(hour, 'hours').add(mins, 'minutes').format('YYYY-MM-DD hh:mm:ss');    
    const postData = {
      invites: lst,
      title: data.title,
      notes: data.notes,
      address: data.address,
      start_date: data.start_date,
      start_time: data.start_time
    };
    this.appService.post_adgenda(postData).subscribe((res) => {
      localStorage.removeItem('invite-pp');
      this.navCtrl.navigateBack('tabs/(tab2:tab2)');
    });
  }

  invitePP() {
    this.navCtrl.navigateForward('invite');
  }

  loadInvitePP() {
    const lst = localStorage.getItem('invite-pp');
    this.invitePPList = JSON.parse(lst);
  }
  updateAdgenda() {
    const adgId = this.route.snapshot.params.id;
    this.appService.put_adgenda(this.fGroup.value, adgId).subscribe((res) => {
      this.navCtrl.navigateBack('agenda-list');
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      const id = this.route.snapshot.params.id;
      this.loadAdgenda(id);
      event.target.complete();
    }, 2000);
  }
}
