import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from 'src/typings';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private preferences: BehaviorSubject<Preferences> = new BehaviorSubject({
    auth: false,
    passcode: null
  });

  constructor(
    private nativeStorage: NativeStorage
  ) {}

  getPreferences() {
    this.updateData();
    return this.preferences.asObservable();
  }

  async setPreferences(preferences: Preferences) {
    try {
      await this.nativeStorage.setItem("preferences", preferences);
      await this.updateData();
    }
    catch(err) {
      console.log(err);
    }
  }

  async getData() {
    try {
      const preferences: Preferences = await this.nativeStorage.getItem("preferences");
      return preferences;
    }
    catch(err) {
      console.log(err);
    }
  }

  private async updateData() {
    const preferences = (await this.getData()) || {};
    this.preferences.next(preferences);
  }

}
