import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import * as JSZip from 'jszip';
import { StorageService } from 'src/app/storage.service';
import { PreferenceService } from 'src/app/preference.service';
import { Preferences } from 'src/typings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  preferences: Preferences;
  authToggle: FormControl = new FormControl(false);

  constructor(
    private file: File,
    private socialSharing: SocialSharing,
    private preferenceService: PreferenceService,
    private storage: StorageService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.preferenceService.getPreferences().subscribe((result) => {
      this.preferences = result;
      const auth = this.preferences.auth ? true : false;
      this.authToggle.setValue(auth);
    })

    this.authToggle.valueChanges.subscribe(async (result) => {
      if (result === true && !this.preferences.passcode) {
        this.authToggle.setValue(false, {emitEvent: false});
        await this.showToast("Set a passcode to enable authentication");
      }
      else {
        this.preferences.auth = result;
        this.preferenceService.setPreferences(this.preferences);
      }
    })
  }

  async setPasscode() {
    const alert = await this.alertCtrl.create({
      header: "Set passcode for authentication",
      inputs: [
        {
          name: "passcode",
          placeholder: "Passcode",
          type: "password",
          attributes: {
            minLength: 4,
            maxLength: 6,
            inputmode: "numeric"
          },
          value: this.preferences.passcode || "",
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Save",
          handler: (data) => {
            if (!data.passcode || data.passcode.length < 4 || data.passcode.length > 6 || !/^\d+$/.test(data.passcode)) {
              this.showToast("Enter a passcode between 4 and 6 characters")
              return false;
            }
            else if (data.passcode !== this.preferences.passcode) {
              this.preferences.passcode = data.passcode;
              this.preferenceService.setPreferences(this.preferences);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async exportFiles() {
    try {
      const zip: JSZip = new JSZip();

      for (let type of ['diary', 'imagination']) {
        const entries = await this.storage.getEntries(type);
        const folder = zip.folder(type);
  
        for (let entry of entries) {
          const file = await this.storage.readFileAsArrayBuffer(entry.fileUrl);
          folder.file(entry.title + ".m4a", file);
        }
      }
  
      const exportFile = await zip.generateAsync({type: 'arraybuffer'});
  
      const filePath = await this.file.writeFile(this.file.tempDirectory, 'DearDiary.zip', exportFile, {replace: true});
      this.socialSharing.share(null, null, filePath.nativeURL);  
    }
    catch(err) {
      this.showToast("Error exporting: " + err);
      console.log(err);
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    })
    await toast.present();
  }
}
