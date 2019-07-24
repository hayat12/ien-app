import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DefaultIcon } from 'src/app/app.constant';
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
            if (res.length > 0) {
                this.list = res[0];
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

}
