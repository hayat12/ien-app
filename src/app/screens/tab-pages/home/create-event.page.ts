import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { DefaultIcon } from 'src/app/app.constant';
import { Location } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';
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
      if (res.length > 0) {
        this.patchEvent(res[0]);
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
        user: [1],
        // qty: [0, [Validators.required, Validators.min(0)]],
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
      // qty: data.qty,
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
        this.onSuccess(res);
        if (this.imagePath != null) {
          this.uploadFile(res.id);
        } else {
          this.navCtrl.navigateBack('events', 'mg');
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
    this.fileChooser.open()
    .then(uri => {
      // this.uploadFile(uri);
      this.imagePath = uri;
    })
    .catch(e => {
      console.log(e);
    });
  }

  uploadFile(eventId) {
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
    fileTransfer.upload(this.imagePath, `${this.appService.baseUrl}/api/event/test-upload/${eventId}`, options)
      .then((data) => {
        const message = 'Successfully uploaded';
        this.presentToast(message);
        this.navCtrl.navigateBack('events');
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
}
