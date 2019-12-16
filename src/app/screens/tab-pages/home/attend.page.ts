import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/screens/app.service';
import { ActivatedRoute } from '@angular/router';
import { DefaultIcon } from 'src/app/app.constant';
import * as _ from 'lodash';
@Component({
    selector: 'app-attend',
    templateUrl: './attend.page.html',
    styleUrls: ['./attend.page.scss'],
})
export class AttendPage implements OnInit {
    list = [];
    readonly CONSTANT_ICONS = DefaultIcon;
    constructor(
        private navCtrl: NavController,
        private route: ActivatedRoute,
        private appService: AppService
    ) { }

    ngOnInit() {
        this.getAttending();
    }

    doRefresh(event) {
        this.getAttending();
        event.target.complete();

    }
    getAttending() {
        const id = this.route.snapshot.params.id;
        this.appService.get_AttendingEvent(id).subscribe((res: any) => {
            this.list = res;
        });
    }

    blankImage(img){
        let o = null;
        if (_.isEmpty(img)) {
            o = this.CONSTANT_ICONS.PROFILE_PICTURE;
        } else {
            o = img;
        }
        return o;
    }
    blankName(obj){
        let o = null;
        if (!_.isEmpty(obj.first_name)) {
            o = obj.first_name;
        }else if (!_.isEmpty(obj.last_name)) {
            o = obj.last_name;
        }
         else {
            o = obj.email;
        }
        return o;
    }
}
