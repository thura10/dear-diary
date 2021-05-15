import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from 'src/typings';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private preferences: BehaviorSubject<Preferences> = new BehaviorSubject({});

  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.updateData();
    })
  }

  getPreferences() {
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

  private async updateData() {
    try {
      const preferences: Preferences = await this.nativeStorage.getItem("preferences");
      this.preferences.next(preferences);
    }
    catch(err) {
      console.log(err);
    }
  }

}
