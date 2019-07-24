import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppService } from 'src/app/screens/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-attend',
    templateUrl: './attend.page.html',
    styleUrls: ['./attend.page.scss'],
})
export class AttendPage implements OnInit {
    list = [];
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
        this.appService.get_ListmarketPlace().subscribe((res: any) => {
            this.list = res;
        });
    }
}
