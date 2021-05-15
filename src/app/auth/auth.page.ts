import { Component, OnInit } from '@angular/core';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private touchId: TouchID,
    private platform: Platform
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    this.touchId.isAvailable()
    .then(
      (res) => {
        this.touchId.verifyFingerprintWithCustomPasswordFallback("Unlock your recordings")
        .then(
          (res) => {
            console.log('Ok', res)
          },
          (err) => {
            console.error('Error', err)
          }
        );
      },
      (err) => {
        console.error('TouchID is not available', err)
      }
    );
  }

}
