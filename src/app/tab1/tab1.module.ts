import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { HomePage } from '../screens/tab-pages/home/home.page';
import { NotificationPage } from '../screens/tab-pages/notification/notification.page';
import { ContactsPage } from '../screens/tab-pages/contacts/contacts.page';
import { BusinessMatchingPage } from '../screens/tab-pages/business-matching/business-m.page';
import { EventPage } from '../screens/tab-pages/home/event.page';
import { MyMonthPipe } from '../share/pipe/my-month.pipe';
import { CalendarPage } from '../screens/tab-pages/calendar/calendar.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page, }])
  ],
  declarations: [
    Tab1Page,
    HomePage,
    CalendarPage,
    NotificationPage,
    BusinessMatchingPage,
    ContactsPage],
  providers: [
    MyMonthPipe,
  ]
})
export class Tab1PageModule { }
