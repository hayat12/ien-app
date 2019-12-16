import { Component, OnInit } from '@angular/core';
import { MonthList } from '../calendar/months';
@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  monthList = new MonthList();
  mList: any;
  MonthsName = this.monthList.MonthsName;
  constructor() { }

  ngOnInit() {
    this.myMonth("jan");
  }

  myMonth(monthName) {
    console.log(monthName);

    let m = this.monthList.months[0];
    switch (monthName) {
      case "jan":
        this.mList = m.jan;
        break;
      case "feb":
        this.mList = m.jan;
        break;
      default:
        this.mList = m.april;
        break;
    }
  }

}