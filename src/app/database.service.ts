/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { File, Entry } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

enum Directories {
  DIARY = "diary",
  IMAGINATION = "imagination"
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private diaryEntries: BehaviorSubject<Entry[]>;
  private imaginationEntries: BehaviorSubject<Entry[]>;

  constructor(
    private file: File,
    private platform: Platform
  ) {
    this.platform.ready()
    .then(() => {
      for (let dir in Directories) {
        this.file.createDir(this.file.documentsDirectory, dir, false)
        .then(() => {})
        .catch(err => {})  
      }
    })
  }

  getDiaryEntries() {
    this.updateEntries(Directories.DIARY);
    return this.diaryEntries.asObservable();
  }
  getImaginationEntries() {
    this.updateEntries(Directories.IMAGINATION);
    return this.diaryEntries.asObservable();
  }

  private updateEntries(dir: string) {
    this.file.listDir(this.file.documentsDirectory, dir)
    .then((result) => {
      switch(dir) {
        case Directories.DIARY:
          this.diaryEntries.next(result);
          break;
        case Directories.IMAGINATION:
          this.imaginationEntries.next(result);
          break;
      }
    })
  }

}
