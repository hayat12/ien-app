import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AppService } from '../../app.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Location } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import * as _ from 'lodash';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { DefaultIcon } from 'src/app/app.constant';
@Component({
  selector: 'app-create-profile',
  templateUrl: 'create-profile.page.html',
  styleUrls: ['create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {
  fGroup: FormGroup;
  testData: any;
  sList = [];
  stp1 = true;
  stp2 = false;
  stp3 = false;
  isSubmittedStep1 = true;
  isSubmittedStep2 = false;
  isSubmittedStep3 = false;
  userId: null;
  public pic: any;
  imgUrl = null;
  userDetails: any;
  readonly APP_DEFAULT_ICON = DefaultIcon.PROFILE_PICTURE;
  subList = [];
  chipList = [
    {id: 0, name: 'Computer Graphics'},
    {id: 1, name: 'Hardware'},
    {id: 2, name: 'Software'},
    {id: 3, name: 'Artificial Intelligence'},
    {id: 4, name: 'Machine Learning'},
    {id: 5, name: 'Software Engineering'},
    {id: 6, name: 'Cloud'},
    {id: 7, name: 'Multimedia'},
  ];
  destinationList = [
    {id: 1, name: 'Educations'},
    {id: 2, name: 'Business'},
    {id: 3, name: 'Marketing'},
    {id: 4, name: 'Gaming'},
    {id: 5, name: 'None'}
  ];

  constructor(
    private spinnerDialog: SpinnerDialog,
    private transfer: FileTransfer,
    private fb: FormBuilder,
    private fileChooser: FileChooser,
    private location: Location,
    private appService: AppService
  ) {

  }
  ngOnInit() {
    this.createFrom();
    this.getUserDetails();
    this.spinnerDialog.show();

  }

  getUserDetails() {
    this.appService.getUserDetails().subscribe(
      (res: any) => {
        this.fGroup.patchValue(
          {
            id: res.id,
            first_name: res.first_name,
            last_name: res.last_name,
            email: res.email,
          });
          this.get_currentUser(res.id);
          this.spinnerDialog.hide();
      },
      (error) => {
        this.spinnerDialog.hide();
        console.log(error);
      }
    );
  }
  uploadImage(files: FileList) {
    if (files.length > 0) {
      this.pic = files.item(0);
        const formData: FormData = new FormData();
        formData.append('picture', this.pic);
      this.appService.put_profile_image(formData, this.fGroup.value.id ).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.log('nothing');
    }
  }
  get_currentUser(id) {
    this.appService.get_currentUser(id).subscribe((res: any) => {
      if (res.length > 0) {
        const data = res[0];
        this.userDetails = data;
        this.imgUrl = data.picture;
        this.patchUserInfo(data);
      }
      // if (data.picture !== undefined || data.picture !== null) {
      //   this.imgUrl = data.picture;
      // }
    });
  }

  patchUserInfo(data) {
    this.fGroup.patchValue(
      {
        id: data.id,
        email: data.email,
        phone: data.phone,
        picture: data.picture,
        company_name: data.company_name,
        fax: data.fax,
        steps: data.steps,
        designation: data.designation,
        about_me: data.about_me,
        dob: data.dob,
        address: data.address,
        organization_name: data.organization_name,
        position_held: data.position_held,
        passport: data.passport,
        account_no: data.account_no,
        main_interest: data.main_interest,
        sub_interest: data.sub_interest,
        created_date: data.created_date,
      }
    );
    this.subList = JSON.parse(data.sub_interest);
  }
  createFrom() {
    this.fGroup = this.fb.group(
      {
        id: [null],
        first_name: [null, []],
        last_name: [null, []],
        email: [Validators.required],
        designation: [null, []],
        about_me: [null, []],
        phone: [null, []],
        address: [null, []],
        dob: [null, []],
        company_name: [null, []],
        position_held: [null, []],
        passport: [null, []],
        account_no: [null, []],
        main_interest: [null],
        sub_interest: [null],
        bank_name: [null, []],
      }
    );
  }

  saveProfile(data) {
    const o = {
      about_me: data.about_me,
      account_no: data.account_no,
      address: data.address,
      bank_name: data.bank_name,
      company_name: data.company_name,
      designation: data.designation,
      dob: data.dob,
      email: data.email,
      first_name: data.first_name,
      id: data.id,
      last_name: data.last_name,
      main_interest: data.main_interest,
      passport: data.passport,
      phone: data.phone,
      position_held: data.position_held,
      sub_interest: JSON.stringify(this.subList)
    };
    console.log(o);
    this.spinnerDialog.show();
    this.appService.queryUpdateProfile(o).subscribe(
      (res) => {
        this.resetStep();
        this.spinnerDialog.hide();
        this.location.back();
      },
      (err) => {
        this.spinnerDialog.hide();
        console.log(err);
      }
    );
  }


  chooseImage() {
    this.fileChooser.open()
    .then(uri => {
      this.uploadFile(uri);
    })
    .catch(e => {
      console.log(e);
    });
  }
  uploadFile(imgUri) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
      fileKey: 'picture',
      fileName: 'picture',
      chunkedMode: false,
      mimeType: 'image/jpeg',
      headers: {}
    };
    fileTransfer.upload(imgUri, `${this.appService.baseUrl}/api/upload-image/${this.userDetails.id}`, options)
      .then((data) => {
        this.getUserDetails();
      }, (err) => {
        console.log(err);
      });
  }

  blankImage(img) {
    let lb = null;
    if (_.isEmpty(img)) {
      lb = this.APP_DEFAULT_ICON;
    } else {
      lb = img;
    }
    return lb;
  }

  active(stp) {
    let s = null;
    if (stp === true) {
      s = 'active';
    }
    return s;
  }

  activeChip(o) {
    const i = _.findIndex(this.subList, (k) => {
      return k.id === o.id;
    });
    return i >= 0 ? true : false;
  }

  subInterestChip(o) {
    const i = _.indexOf(this.subList, o);
    if (i < 0) {
      this.subList.push(o);
      this.sList.push(o.id);
    } else {
      _.remove(this.subList, o);
    }
}

submitStep1() {
  this.isSubmittedStep1 = false;
  this.isSubmittedStep2 = true;
}

submitStep2() {
  this.isSubmittedStep2 = false;
  this.isSubmittedStep3 = true;
  this.stp2 = true;
}

resetStep() {
  this.isSubmittedStep2 = false;
  this.isSubmittedStep3 = false;
  this.stp1 = true;
  this.stp2 = false;
  this.stp3 = false;
}
}
