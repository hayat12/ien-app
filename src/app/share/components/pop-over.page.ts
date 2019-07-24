import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, NavController, Events } from '@ionic/angular';
import { PopOver } from './popover.model';
import { Router } from '@angular/router';
import { AppService } from 'src/app/screens/app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'pop-over.page.html',
  styleUrls: ['pop-over.page.scss'],
})
export class PopoverPage implements OnInit {
  response: PopOver;
  constructor(
    public popoverController: PopoverController,
    public router: Router,
    public events: Events,
    public navCtrl: NavController,
    private appService: AppService,
    public navParams: NavParams) {}
  ngOnInit() {
     this.response = this.navParams.data;
  }

  deleteItem() {
    this.appService.delete_event(this.response.id).subscribe((res) => {
      console.log(res);
      this.navCtrl.navigateBack(`/events`);
    });
  }

  editItem() {
    this.navCtrl.navigateBack(`/edit-event/${this.response.id}`);
  }
}
