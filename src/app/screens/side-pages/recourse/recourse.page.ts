import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
@Component({
  selector: 'app-recourse',
  templateUrl: 'recourse.page.html',
  styleUrls: ['recourse.page.scss'],
})
export class RecoursePage implements OnInit {
  fgroup: FormGroup;
  constructor(
    private events: Events,
    private fb: FormBuilder,
    private router: Router,
  ) { }
  ngOnInit() { }

}
