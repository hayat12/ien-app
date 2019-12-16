import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DefaultIcon } from 'src/app/app.constant';
import { ActionSheetController } from '@ionic/angular';
@Component({
    selector: 'app-view-market-place',
    templateUrl: './view.page.html',
    styleUrls: ['./view.page.scss']
})
export class ViewMarketPlace implements OnInit {
    fGroup: FormGroup;
    list: any = [];
    isEditMode = false;
    readonly APP_DEFAULT_ICON = DefaultIcon;
    constructor(
        private fb: FormBuilder,
        public actionSheetController: ActionSheetController,
        private navCtrl: NavController,
        private appService: AppService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getMarketPlace();
    }

    getMarketPlace() {
        const id = this.route.snapshot.params.id;
        this.appService.get_marketPlace(id).subscribe((res: any) => {
            if (!_.isEmpty(res)) {
                this.list = res;
            } else {
                this.list = [];
            }
        });
    }

    blankImage(img) {
        let b = null;
        if (_.isEmpty(img)) {
            b = this.APP_DEFAULT_ICON.EVENT_IMAGE;
        } else {
            b = img;
        }
        return b;
    }

    async boyNow() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Add to Card',
            buttons: [{
              text: 'Coming Soon',
            //   role: 'destructive',
            //   icon: 'trash',
              handler: () => {
                console.log('Delete clicked');
              }
            },{
              text: 'Cancel',
              icon: 'close',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
        ]
          });
          await actionSheet.present();
    }
}
