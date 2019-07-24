import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-business-m',
  templateUrl: 'business-m.page.html',
  styleUrls: ['business-m.page.scss'],
})
export class BusinessMatchingPage implements OnInit {
  result: any = [];
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController) {
     this.result = this.route.snapshot.params;
    }

  ngOnInit() {
  }

  doIt() {
    this.navCtrl.navigateForward('/profile');
  }
}
