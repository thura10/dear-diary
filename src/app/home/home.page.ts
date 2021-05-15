import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthPage } from '../auth/auth.page';
import { PreferenceService } from '../preference.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  screenWidth: number;

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private preferenceService: PreferenceService
  ) {}

  async ionViewWillEnter() {
    await this.platform.ready();
    const preferences = await this.preferenceService.getData();
    if (preferences.auth) {
      const modal = await this.modalCtrl.create({
        component: AuthPage,
        componentProps: {
          passcode: preferences.passcode
        },
        cssClass: 'fullscreen-modal',
        swipeToClose: false,
        showBackdrop: true,
        backdropDismiss: false
      })
      await modal.present();  
    }
  }

  ngOnInit() {
    this.screenWidth = this.platform.width();
  }

}
