import { Component, OnInit } from '@angular/core';
import { PopOver } from './popover.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.html',
  styleUrls: ['loader.scss'],
})
export class Loader implements OnInit {
  response: PopOver;
  constructor(
    public loadingController: LoadingController
  ) {}
  ngOnInit() {
    console.log('loader page');
  }
}
