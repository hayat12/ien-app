import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabs =  [
    {id: 0, tab: 'tab1', icon: 'home', color: 'light', link: '/tabs/(tab1:tab1)'},
    {id: 1, tab: 'tab2', icon: 'calendar', color: 'light', link: '/tabs/(tab2:tab2)'},
    {id: 2, tab: 'tab3', icon: 'contacts', color: 'light', link: '/tabs/(tab3:tab3)'},
    {id: 2, tab: 'tab4', icon: 'globe', color: 'light', link: '/tabs/(tab4:tab4)'},
    {id: 4, tab: 'tab5', icon: 'notifications', color: 'light', link: '/tabs/(tab5:tab5)'},
  ];

  selectedTab(evn, val) {
    console.log(evn);
    let s = '';
    if (val === 'tab-selected') {
      s = 'light';
    } else {
      s = '';
    }
    return s;
  }
}
