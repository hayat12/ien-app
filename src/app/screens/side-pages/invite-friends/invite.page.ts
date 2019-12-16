import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import * as _ from 'lodash';
import { NavController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-invite',
  templateUrl: 'invite.page.html',
  styleUrls: ['invite.page.scss'],
})
export class InviteConnectionPage implements OnInit {
  userList = [];
  selectedList = [];
  constructor(
    public toastController: ToastController,
    private socialSharing: SocialSharing,
    private appSerivce: AppService,
    private navCtrl: NavController
  ) { }
  ngOnInit() {
    this.loadConnections();
  }

  loadConnections() {
    this.appSerivce.get_listUsers().subscribe((res: any) => {
      this.userList = res;
    });
  }
  selectConnection(o) {
    const i = _.findIndex(this.selectedList, (k) => {
      return k.id === o.id;
    });
    if (i >= 0) {
      _.remove(this.selectedList, function(n) {
        return n.id  === o.id;
      });
    } else {
      this.selectedList.push(o);
    }
  }

  inviteNow() {
    this.appSerivce.post_connection(this.selectedList).subscribe((res) => {
      this.navCtrl.goBack();
    });
  }

  blankName(info: any) {
    let userInfo = null;
    if (!_.isEmpty(info.first_name)) {
      userInfo = info.first_name;
    } else if (!_.isEmpty(info.last_name)) {
      userInfo = info.last_name;
    } else {
      userInfo = info.username;
    }
    return userInfo;
  }

  ShareWithEmail(){
    this.socialSharing.shareViaEmail('IEN GloBal Android App', 'IEN Global', ['ienetwork919@gmail.com']).then((res) => {
      this.presentToast();
    }).catch((err) => {
      console.log(err);
    });
  }

  ShareWithFacebook(){
    this.socialSharing.shareViaFacebook("com.apple.social.facebook", null, 'com.apple.social.facebook').then( (res)=>{
      this.presentToast();
    }, (err)=>{
      console.log(err);
    })
  } 

  ShareWithWhatsApp(){
    this.socialSharing.shareViaWhatsApp("IEN GloBal Android App", null , 'https://web.whatsapp.com').then( (res)=>{
      this.presentToast();
    }, (err)=>{
      console.log(err);
    })
  }

  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully Shared',
      duration: 2000
    });
    toast.present();
  }
}
