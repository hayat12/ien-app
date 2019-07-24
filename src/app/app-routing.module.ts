import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpPage } from './screens/sign-up';
import { SliderPage } from './screens/slider-screen/slider.page';
import { LoginPage } from './screens/login';
import { ProfilePage } from './screens/side-pages/profile';
import { EventPage } from './screens/tab-pages/home/event.page';
import { EventDetailsPage } from './screens/tab-pages/home/event-details.page';
import { SearchPage } from './share';
import { CreateProfilePage } from './screens/side-pages/profile/create-profile.page';
import { CreateCompanyPage } from './screens/side-pages/profile/company/create-company.page';
import { CreateEventPage } from './screens/tab-pages/home/create-event.page';
import { MarketPlacePage } from './screens/tab-pages/home/market-place/market-place.page';
import { AgendaComponent } from './screens/tab-pages/calendar/agenda.component';
import { InvitePage } from './screens/tab-pages/calendar/invite-friend/invite.page';
import { SetPasswordPage } from './screens/set-password';
import { AddMarketPlaceComponent } from './screens/tab-pages/home/market-place/add-market-place.component';
import { InviteConnectionPage } from './screens/side-pages/invite-friends';
import { CalendarDetailPage } from './screens/tab-pages/calendar/calendar-detail.page';
import { AuthGuard } from './screens/auth/auth-guard/auth.guard';
import { ViewProfilePage } from './screens/side-pages/profile/view-profile/view-profile.page';
import { ViewMarketPlace } from './screens/tab-pages/home/market-place/view-market-place/view.page';
import { AttendPage } from './screens/tab-pages/home/attend.page';
import { GlobalEventList } from './screens/tab-pages/home/g-event-list.page';
import { ListAgendaComponent } from './screens/tab-pages/calendar/agenda-list.component';
const routes: Routes = [
  { path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'slider',
    component: SliderPage
  },
  {
    path: 'events',
    component: EventPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'events/:mg',
    component: EventPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'sign-up',
    component: SignUpPage
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-profile',
    component: CreateProfilePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-company',
    component: CreateCompanyPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-event',
    component: CreateEventPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-profile',
    component: ViewProfilePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'g-list',
    component: GlobalEventList,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-event/:id',
    component: CreateEventPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'market-place',
    component: MarketPlacePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-market-place',
    component: AddMarketPlaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-market-place/:id',
    component: AddMarketPlaceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'event-details/:id',
    component: EventDetailsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'event-details/:id/:mg',
    component: EventDetailsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-adgenda',
    component: AgendaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adgenda/:id',
    component: AgendaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'market-place',
    component: MarketPlacePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'invite',
    component: InvitePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'invite-connection',
    component: InviteConnectionPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar-details/:id',
    component: CalendarDetailPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'set-password',
    component: SetPasswordPage
  },
  {
    path: 'view-market-place/:id',
    component: ViewMarketPlace
  },
  {
    path: 'attend/:id',
    component: AttendPage
  },
  {
    path: 'agenda-list',
    component: ListAgendaComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
