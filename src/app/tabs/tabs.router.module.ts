import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { HomePage } from '../screens/tab-pages/home/home.page';
import { NotificationPage } from '../screens/tab-pages/notification/notification.page';
import { CalendarPage } from '../screens/tab-pages/calendar/calendar.page';
import { ContactsPage } from '../screens/tab-pages/contacts/contacts.page';
import { EventPage } from '../screens/tab-pages/home/event.page';
import { AuthGuard } from '../screens/auth/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/(tab1:tab1)',
        pathMatch: 'full',
      },
      {
        path: 'login',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'tab1',
        outlet: 'tab1',
        component: HomePage,
        canActivate: [AuthGuard]
      },
      {
        path: 'tab2',
        outlet: 'tab2',
        component: CalendarPage,
        canActivate: [AuthGuard]
      },
      {
        path: 'tab3',
        outlet: 'tab3',
        component: ContactsPage,
        canActivate: [AuthGuard]
      },
      {
        path: 'tab4',
        outlet: 'tab4',
        component: NotificationPage,
        canActivate: [AuthGuard]
      },
      {
        path: 'tab5',
        outlet: 'tab5',
        component: NotificationPage,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(tab1:tab1)',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
