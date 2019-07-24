import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AppService } from '../../../app.service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-company',
  templateUrl: 'create-company.page.html',
  styleUrls: ['create-company.page.scss'],
})
export class CreateCompanyPage implements OnInit {
  fgroup: FormGroup;
  mainInterest = null;
  selected = [];
  no:number;

  subInterest = [
    {key: 0, value: "Computer Graphics" },
    {key: 1, value: "Hardware" },
    {key: 2, value: "Software" },
    {key: 3,value: "Artifical Intelli" },
    {key: 4,value: "Matchine Learning" },
    {key: 5,value: "Software Engineering" },
    {key: 6,value: "Cloud" },
    {key: 7,value: "Multimedia" }
  ]

  seletedItem = [];
  // companyLogo: string = 'assets/imgs/imgs.jpg' || null
  constructor(
    private events: Events,
    private spinnerDialog: SpinnerDialog,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private appService: AppService
  ) { }
  ngOnInit() {
    this.spinnerDialog.show();
    this.createForm();
    this.getCompanyDetails();
  }

  createForm() {
    var o = JSON.parse(localStorage.getItem('ien_token'));
    var email = o.ien_email;
    this.fgroup = this.fb.group(
      {
        id: [null, []],
        companyName: [null, []],
        industry: [null, []],
        userEmail: [email, Validators.required],
        officePhoneNo: [null, []],
        officeEmail: [null, []],
        address: [null, []],
        website: [null, []],
        aboutCompany: [null, []],
        yearFound: [null, []],
        companySize: [null, []],
        mameAsPass: [null, []],
        accountNo: [null, []],
        bankName: [null, []],
        mainInterest: [this.mainInterest, []],
        subInterest: [null, []]
      }
    )
  }

  setMainInterest(event) {
    console.log(event);
  }

  /**
   * 
   * @param value 
   * Check if the company is already exist we just neet update else create new company
   */
  saveCompany(value) {
    this.spinnerDialog.show();
    if (this.fgroup.value.id !=null) {
      console.log('update', this.fgroup.value.id );
      this.updateCompany(this.fgroup.value)
    }
    else{
      console.log('create', this.fgroup.value.id );
      this.registerCompany(this.fgroup.value);
    }
  }

  /**
   * 
   * @param data 
   * @see Create New Company
   */
  registerCompany(data){
    this.appService.registerCompany(this.fgroup.value).subscribe(
      (res:any) => {
        this.onSucess(res);
      },
      (error) => {
        this.onError(error)
      }
    )
  }
 

  /**
   * 
   * @param data 
   * @see Update Company
   */
  updateCompany(data){
    this.appService.queryUpdateCompany(this.fgroup.value).subscribe(
      (res:any) => {
        this.onSucess(res);
      },
      (error) => {
        this.onError(error)
      }
    )
  }
 
  isActive(idx) {
    console.log(idx);
  }


  /**
   * @param value 
   * @see set Data that we got from sever in 
   * to form to display for user and ready for update
   */
  setFormValue(value){
   var data = value[0];
    this.fgroup.patchValue(
      {
        id: data.id,
        companyName: data.companyName,
        industry: data.industry,
        userEmail: data.userEmail,
        officePhoneNo: data.officePhoneNo,
        website: data.website,
        officeEmail: data.officeEmail,
        aboutCompany: data.aboutCompany,
        yearFound: data.yearFound,
        companySize: data.companySize,
        address: data.address,
        mameAsPass: data.mameAsPass,
        accountNo: data.accountNo,
        bankName: data.bankName,
        mainInterest: data.mainInterest,
        subInterest: data.subInterest
      }
    );
  }

  /**
   * get user company if its exist searching by user email 
   */
  getCompanyDetails(){
    var o = JSON.parse(localStorage.getItem('ien_token'));
    var email = o.ien_email;
    if (email !=null) {
      this.appService.queryGetCompanyDetails(email).subscribe(
        (res:[])=>{
          this.spinnerDialog.hide();
          if (res.length<1) {
            return
          }else{
            this.setFormValue(res)
          }
        },
        (err)=>{
          this.spinnerDialog.hide();
          this.location.back();
          console.log(err);
        }
      )
    }
  }

  onSucess(res){
    console.log(res);
    this.spinnerDialog.hide();
    this.location.back();
  }

  onError(error){
    console.log(error);
    this.spinnerDialog.hide();
  }


  set statusOption(j: number) {
    this.no = j;
    this.selected.push(j)    ;
    console.log(this.selected);
  }

  get statusOption(): number {
    return this.no;
  }

}
