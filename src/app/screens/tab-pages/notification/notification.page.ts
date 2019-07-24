import { Component, OnInit } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: 'notification.page.html',
  styleUrls: ['notification.page.scss'],
})
export class NotificationPage implements OnInit{
  result: any = []
  user: UserModel
  constructor(
    private events: Events,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController) {
     this.result = this.route.snapshot.params;
    }

  ngOnInit(){
  }

  doIt(){
    this.navCtrl.navigateForward('/profile')
  }

}

export class UserModel {
  token: string;
  display: string;
  email: string;
  familyName: string;
  givenName: string;
  imageUrl: string;
}
