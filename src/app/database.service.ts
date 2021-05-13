/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private file: File,
    private platform: Platform
  ) {}

}
