import { Component, OnInit, OnChanges } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import * as _ from 'lodash';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';
import { MonthList } from '../calendar/months';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage implements OnInit, OnChanges {
  result = null;
  idx = null;
  adgList = [];
  monthsList = [];
  events: any;


  monthList = new MonthList();
  mList: any;
  MonthsName = this.monthList.MonthsName;


  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  eventSettings: MbscEventcalendarOptions = {
    lang: 'de',
    theme: 'ios',
    display: 'inline',
    view: {
      calendar: { type: 'month' },
      eventList: { type: 'month', scrollable: true }
    }
  };
  daysList = [
    { id: 0, short: 'MON' },
    { id: 1, short: 'TUE' },
    { id: 2, short: 'WED' },
    { id: 3, short: 'THU' },
    { id: 4, short: 'FRI' },
    { id: 5, short: 'SAT' },
    { id: 6, short: 'SUN' },
  ];


  constructor(
    private appService: AppService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private navCtrl: NavController) {
    this.result = this.route.snapshot.params;
  }
  ngOnInit() {
    this.myMonth({ name: "Jan", value: "jan", id: 1 });
    localStorage.removeItem('invite-pp');
    this.http.get('assets/date.json').subscribe((res: any) => {
      this.monthsList = res;
    });
  }
  ngOnChanges() {
    console.log('Updated');
  }
  getDays(days) {
    for (let i = 0; i < days.length; i++) {
      console.log(days[i].days);
    }
  }

  ionViewWillEnter() { // THERE IT IS!!!
    // this.loadConnect();
    this.loadAdgenda();
  }
  doIt() {
    this.navCtrl.navigateForward('/profile');
  }
  goSearch() {
    this.navCtrl.navigateForward('/search');
  }
  addNewAdgenda() {
    this.navCtrl.navigateForward('new-adgenda');
  }

  loadConnect() {
    this.appService.get_connections().subscribe((res) => {
      console.log(res);
    });
  }

  loadAdgenda() {
    this.appService.get_adgendaList().subscribe((res: any) => {
      this.adgList = res;
    });
  }
  editAdgenda(id) {
    this.navCtrl.navigateForward(`/adgenda/${id}`);
  }
  viewAdgenda(id) {
    this.navCtrl.navigateForward(`/calendar-details/${id}`);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadAdgenda();
      event.target.complete();
    }, 2000);
  }

  setActiveWeek(idx) {
    this.idx = idx;
    this.sortAgenda(idx);
  }

  sortAgenda(idx) {
    this.appService.get_sortAdgendaList(idx).subscribe((res: any) => {
      this.adgList = res.body;
    });
  }
  activeWeek(i) {
    let cl = null;
    if (i === this.idx) {
      cl = 'active-day';
    } else {
      cl = 'none';
    }
    return cl;
  }
  getJoiedUser(o) {
    let rs = [];
    this.appService.get_joinedAgenda(o.user_id).subscribe((res: any) => {
      rs = this.adgList = res.body;
    });
    return rs;
  }

  /** Calendar */

  onEventSelected(ev) {

  }

  onViewTitleChanged(ev) {

  }

  onTimeSelected(ev) {

  }


  myMonth(monthName: any) {
    console.log(monthName.value);

    let m = this.monthList.months[0];
    switch (monthName.value) {
      case "jan":
        this.mList = m.jan;
        break;
      case "feb":
        this.mList = m.feb;
        break;
      case "march":
        this.mList = m.march;
        break;
      case "april":
        this.mList = m.april;
        break;
      case "may":
        this.mList = m.may;
        break;
      case "june":
        this.mList = m.june;
        break;
      case "july":
        this.mList = m.july;
        break;
      case "aug":
        this.mList = m.aug;
        break;
      case "sep":
        this.mList = m.sep;
        break;
      case "oct":
        this.mList = m.oct;
        break;
      case "nev":
        this.mList = m.nev;
        break;
      default:
        this.mList = m.april;
        break;
    }
    this.sortAgenda(monthName.id);
  }

  myDay(day) {
    console.log(day);
  }
}
