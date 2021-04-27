import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  screenWidth: number;

  constructor(private platform: Platform) {
  }

  ngOnInit() {
    this.screenWidth = this.platform.width();
  }

}
