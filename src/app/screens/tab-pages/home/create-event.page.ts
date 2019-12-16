import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { DefaultIcon } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ToastController, NavController, Events } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-event',
  templateUrl: 'create-event.page.html',
  styleUrls: ['create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  autocompleteItems;
  autocomplete;
  latitude: number = 0;
  longitude: number = 0;
  geo: any

  myGroup: FormGroup;
  imgURL: string = null;
  currentMonth: any;
  isEditMode = false;
  imagePath = null;
  image: any;
  readonly APP_DEFAULT_ICON = DefaultIcon;
  constructor(
    public events: Events,
    private transfer: FileTransfer,
    private route: ActivatedRoute,
    private camera: Camera,
    private fb: FormBuilder,
    private fileChooser: FileChooser,
    private navCtrl: NavController,
    private location: Location,
    private toaster: ToastController,
    private appService: AppService,
    private router: Router,
    private spinnerDialog: SpinnerDialog) {
  }
  ngOnInit() {
    this.createForm();
    const id = this.route.snapshot.params.id;
    if (!_.isEmpty(id)) {
      this.isEditMode = true;
      this.loadEvent(id);
    }
  }

  loadEvent(id) {
    this.appService.get_event(id).subscribe((res: any) => {
      if (!_.isEmpty(res)) {
        this.patchEvent(res);
      }
    });
  }
  /**
   * Create Event Form
   */
  patchEvent(data) {
    this.myGroup.patchValue(
      {
        event_name: data.event_name,
        category: data.category,
        created_by: data.created_by,
        event_image: data.event_image,
        start_date: data.start_date,
        start_time: data.start_time,
        end_date: data.end_date,
        end_time: data.end_time,
        location: data.location,
        selected_address: data.selected_address,
        about_event: data.about_event
      });
  }
  createForm() {
    this.myGroup = this.fb.group(
      {
        event_name: ['', Validators.required],
        category: [''],
        created_by: [1],
        event_image: [null],
        start_date: ['', Validators.required],
        start_time: ['', Validators.required],
        end_date: ['', Validators.required],
        end_time: ['', Validators.required],
        location: ['', Validators.required],
        selected_address: ['', Validators.required],
        about_event: ['', Validators.required]
      }
    );
  }

  /**
   * @param data
   * submit to create new event
   */
  createEvent(data) {
    const formData: FormData = new FormData();
    const o = {
      event_name: data.event_name,
      category: data.category,
      created_by: 1,
      user: 1,
      start_date: data.start_date,
      start_time: data.start_time,
      end_date: data.end_date,
      end_time: data.end_time,
      location: data.location,
      selected_address: data.selected_address,
      about_event: data.about_event
    };
    // formData.append('event_image', this.image, JSON.stringify(o));
    this.appService.queryCreateEvent(o).subscribe(
      (res: any) => {
        if (this.imagePath != null) {
          this.uploadFile(res.id);
        } else {
          this.navCtrl.goBack();
        }
      }, (err) => {
        console.log(err);
      });
  }

  /**
   * @param res
   * response for success
   */
  onSuccess(res) {
    console.log(res);
  }

  /**
  * @param res
  * response for error
  */
  onError(err) {
    this.spinnerDialog.hide();
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

    fileTransfer.upload(this.imagePath, `http://linkinnet.com/IENGlobal/public/api/event-picture/${id}`, options)
      .then((data) => {
        this.navCtrl.goBack();
      }, (err) => {
        console.log(err);
      });
  }

  searchAddress(event) {
    const term = event.target.value;
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
      // let autocomplete = new google.maps.places.Autocomplete();
  }


  async presentToast(message) {
    const toast = await this.toaster.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  updateEvent(data) {
    const id = this.route.snapshot.params.id;
    this.appService.put_updateEvent(data, id).subscribe((res) => {
      if (this.imagePath != null) {
        this.uploadFile(id);
      } else {
        this.navCtrl.navigateBack('events');
      }
    });
  }
  blankImage(img) {
    let lb = null;
    if (_.isEmpty(img)) {
      lb = this.APP_DEFAULT_ICON.PROFILE_PICTURE;
    } else {
      lb = img;
    }
    return lb;
  }

  uploadImage(files: FileList){
    const f = files.item(0);
    this.appService.get_testImg(f).subscribe((res)=>{
      console.log(res);
    })
  }
}
