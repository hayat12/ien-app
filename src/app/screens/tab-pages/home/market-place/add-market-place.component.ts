import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/screens/app.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DefaultIcon } from 'src/app/app.constant';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
@Component({
  selector: 'app-add-market-place',
  templateUrl: './add-market-place.component.html',
  styleUrls: ['./add-market-place.component.scss']
})
export class AddMarketPlaceComponent implements OnInit {
  fGroup: FormGroup;
  imagePath = null;
  isEditMode = false;
  readonly APP_DEFAULT_ICON = DefaultIcon;
  uri = null;
  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private appService: AppService,
    private transfer: FileTransfer,
    private toastCtrl: ToastController,
    private camera: Camera,
    private fileChooser: FileChooser
  ) { }
  fileTransfer: FileTransferObject = this.transfer.create();

  ngOnInit() {
    this.createForm();
    const eventId = this.route.snapshot.params.id;
    if (!_.isEmpty(eventId)) {
      this.isEditMode = true;
      this.reloadMarketPlace(eventId);
    } else {
      this.isEditMode = false;
    }
  }


  chooseImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
    }
  
    this.camera.getPicture(options).then((imageData) => {
      // this.uploadFile(imageData);
      this.imagePath = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  uploadFile(id) {
    const token = localStorage.getItem('ien_token');
    if (_.isEmpty(token)) {
      return;
    }
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileKey: 'picture',
      fileName: 'picture',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    fileTransfer.upload(this.imagePath, `http://linkinnet.com/IENGlobal/public/api/market-place-picture/${id}`, options)
      .then((data) => {
        // alert(JSON.stringify(data));
        this.navCtrl.goBack();
      }, (err) => {
        // alert(JSON.stringify(err));
        console.log(err);
      });
  }


  getToken () {
    return localStorage.getItem('ien_token');
  }

  createForm() {
    this.fGroup = this.fb.group(
      {
        item_name: ['', [Validators.required]],
        price: [],
        qty: ['', [Validators.min(1)]],
        desc: ['', [Validators.required]],
        picture: []
      });
  }
  reloadMarketPlace(eventId) {
    this.appService.get_marketPlace(eventId).subscribe((res: any) => {
      this.uri = res.picture;
      this.patchData(res);
    });
  }

  blankImg(){
    let i = null; 
    if (_.isEmpty(this.uri)) {
      i = this.APP_DEFAULT_ICON.EVENT_IMAGE;
    } else {
      i = this.uri;
    }
    return i;
  }
  patchData(data) {
    this.fGroup.patchValue(
      {
        item_name: data.item_name,
        price: data.price,
        qty: data.qty,
        desc: data.desc,
      });
  }
  saveMarketPlace(data) {
    this.appService.post_AddmarketPlace(data).subscribe((res: any) => {
      if (this.imagePath != null) {
        this.uploadFile(res.id);
      } else {
        this.navCtrl.goBack();
      }
      // this.navCtrl.navigateForward('/market-place');
    });
  }
  updateMarketPlace(data){
    const id = this.route.snapshot.params.id;
    this.appService.put_UpdateMarketPlace(data,id).subscribe((res: any) => {
      if (this.imagePath != null) {
        this.uploadFile(res.id);
      } else {
        this.navCtrl.goBack();
      }
    });
  }

}

export class ImageSnippet {
  constructor (public src: string, public file: File) { }
}

