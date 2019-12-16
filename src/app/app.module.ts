import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventPage } from './screens/tab-pages/home/event.page';
import { LoginPage } from './screens/login';
import { SliderPage } from './screens/slider-screen/slider.page';
import { SignUpPage } from './screens/sign-up';
import { ProfilePage } from './screens/side-pages/profile';
import { CreateCompanyPage } from './screens/side-pages/profile/company/create-company.page';
import { CreateEventPage } from './screens/tab-pages/home/create-event.page';
import { CreateProfilePage } from './screens/side-pages/profile/create-profile.page';
import { MarketPlacePage } from './screens/tab-pages/home/market-place/market-place.page';
import { SearchPage } from './share';
import { AppService } from './screens/app.service';
import { AuthService } from './screens/auth/auth.service';
import { Camera } from '@ionic-native/camera/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { EventDetailsPage } from './screens/tab-pages/home/event-details.page';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClientJsonpModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './share/interceptors';
import { MyMonthPipe } from './share/pipe/my-month.pipe';
import { AgendaComponent } from './screens/tab-pages/calendar/agenda.component';
import { InvitePage } from './screens/tab-pages/calendar/invite-friend/invite.page';
import { SetPasswordPage } from './screens/set-password';
import { InviteConnectionPage } from './screens/side-pages/invite-friends';
import { RecoursePage } from './screens/side-pages/recourse';
import { SettingPage } from './screens/side-pages/setting';
import { AddMarketPlaceComponent } from './screens/tab-pages/home/market-place/add-market-place.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { CalendarDetailPage } from './screens/tab-pages/calendar/calendar-detail.page';
import { AuthGuard } from './screens/auth/auth-guard/auth.guard';
import { PopoverPage } from './share/components/pop-over.page';
import { ViewProfilePage } from './screens/side-pages/profile/view-profile/view-profile.page';
import { ViewMarketPlace } from './screens/tab-pages/home/market-place/view-market-place/view.page';
import { AttendPage } from './screens/tab-pages/home/attend.page';
import { GlobalEventList } from './screens/tab-pages/home/g-event-list.page';
import { Loader } from './share/components/loader';
import { ListAgendaComponent } from './screens/tab-pages/calendar/agenda-list.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { NgCalendarModule  } from 'ionic2-calendar';
// import { CalendarModule } from "ion2-calendar";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// last version 7.0.7
@NgModule({
  declarations: [
    AppComponent,
    EventPage,
    LoginPage,
    SliderPage,
    SignUpPage,
    ProfilePage,
    ViewProfilePage,
    EventDetailsPage,
    CreateCompanyPage,
    CreateEventPage,
    CreateProfilePage,
    MarketPlacePage,
    SearchPage,
    ListAgendaComponent,
    InvitePage,
    ViewMarketPlace,
    CalendarDetailPage,
    SetPasswordPage,
    InviteConnectionPage,
    SettingPage,
    Loader,
    GlobalEventList,
    CalendarDetailPage,
    RecoursePage,
    MyMonthPipe,
    PopoverPage,
    AgendaComponent,
    AttendPage,
    AddMarketPlaceComponent,
  ],
  entryComponents: [
    PopoverPage
  ],
  imports: [
    MbscModule,
    // CalendarModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }
    ),
    HttpClientModule,
    HttpClientJsonpModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    FileTransfer,
    SpinnerDialog,
    StatusBar,
    Camera,
    File,
    SocialSharing,
    FileChooser,
    GooglePlus,
    FilePath,
    AppService,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
