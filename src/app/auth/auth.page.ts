import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TouchID } from '@ionic-native/touch-id/ngx';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  @Input() passcode: string;
  passcodeInput: FormControl = new FormControl("");

  biometricStatus: any;
  msg: string = "";

  constructor(
    private touchId: TouchID,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    this.touchId.isAvailable()
    .then(
      (res) => {
        this.biometricStatus = res;
        this.biometricAuth();
      },
      (err) => {
        this.msg = err.localizedDescription || "Biometric authentication unavailable";
        console.error("Touch ID unavailable: ", err);
      }
    );
  }

  biometricAuth() {
    this.touchId.verifyFingerprintWithCustomPasswordFallback("Unlock your recordings")
    .then(
      (res) => {
        this.dismiss();
      },
      (err) => {
        this.msg = err.localizedDescription || "Biometric authentication unavailable";
      }
    );
  }

  passcodeAuth() {
    if (this.passcodeInput.value === this.passcode) {
      this.dismiss();
    }
    else {
      this.msg = "Incorrect passcode"
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
