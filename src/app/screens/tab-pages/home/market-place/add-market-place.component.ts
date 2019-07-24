import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/screens/app.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
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
  imagePath: any = null;
  isEditMode = false;
  logo: File = null;
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
    this.fileChooser.open()
    .then( (uri: any) => {
      this.imagePath = uri;
    })
    .catch(e => {
      console.log(e);
    });
  }

  uploadFile(id) {
    const token = localStorage.getItem('ien_token');
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileKey: 'picture',
      fileName: 'picture',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      headers: {
        'Authorization': `Token ${token}`
      }
    };
    fileTransfer.upload(this.imagePath, `${this.appService.baseUrl}/api/market-place-pictures/${id}`, options)
      .then((data) => {
        console.log(data);
        this.navCtrl.navigateBack('/market-place');
      }, (err) => {
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
    this.appService.get_marketPlace(eventId).subscribe((res) => {
      this.patchData(res[0]);
    });
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
        this.navCtrl.navigateBack('/market-place');
      }
      // this.navCtrl.navigateForward('/market-place');
    });
  }

  // uploadImage(evet: FileList) {
  //   if (evet.length > 0) {
  //     const picture = evet.item(0);
  //       const formData = new FormData();
  //       formData.append('picture', picture);
  //       this.appService.post_marketPlaceUploadPicture(formData, 1 ).subscribe((res) => {
  //         console.log(res);
  //       });
  //   }
  // }

  // updateMarketPlace(data) {
  //   const eventId = this.route.snapshot.params.id;
  //   this.appService.put_UpdateMarketPlace(data, eventId).subscribe((res) => {
  //     this.navCtrl.navigateForward('/market-place');
  //   });
  // }

}

export class ImageSnippet {
  constructor (public src: string, public file: File) { }
}

