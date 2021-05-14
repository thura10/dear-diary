import { Injectable } from '@angular/core';
import { File, Entry } from '@ionic-native/file/ngx';
import { BehaviorSubject } from 'rxjs';

enum Directories {
  DIARY = "diary",
  IMAGINATION = "imagination"
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private diaryEntries: BehaviorSubject<Entry[]> = new BehaviorSubject([]);
  private imaginationEntries: BehaviorSubject<Entry[]> = new BehaviorSubject([]);

  constructor(
    private file: File
  ) {}

  async createNewFile(folder: string, fileName: string) {
    try {
      const location = await this.file.resolveDirectoryUrl(this.file.dataDirectory);
      const dir = await this.file.getDirectory(location, folder, { create: true });

      const file = await this.file.createFile(dir.nativeURL, fileName + ".m4a", true)
      return file.nativeURL;
    }
    catch(err) {
      throw err;
    }
  }
  async removeFile(path: string) {
    try {
      const location = await this.file.resolveLocalFilesystemUrl(path);
      location.remove(
        () => {},
        (err) => {
          console.log(err);
        }
      )
    }
    catch(err) {
      console.log(err);
    }
  }

  getDiaryEntries() {
    this.updateEntries(Directories.DIARY);
    return this.diaryEntries.asObservable();
  }
  getImaginationEntries() {
    this.updateEntries(Directories.IMAGINATION);
    return this.imaginationEntries.asObservable();
  }

  private async updateEntries(folder: string) {
    try {
      const location = await this.file.resolveDirectoryUrl(this.file.dataDirectory);
      const dir = await this.file.getDirectory(location, folder, {create: true});

      dir.createReader().readEntries(
        ((entries) => {
          switch(folder) {
            case Directories.DIARY:
              this.diaryEntries.next(entries);
              break;
            case Directories.IMAGINATION:
              this.imaginationEntries.next(entries);
              break;
          }
        }),
        ((err) => {
          console.log("READ ERR:", err);
        })
      );

    }
    catch(err) {
      console.log(err);
    }
  }

}
