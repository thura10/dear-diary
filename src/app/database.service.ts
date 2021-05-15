import { Injectable } from '@angular/core';
import { File, Entry, DirectoryEntry, Metadata } from '@ionic-native/file/ngx';
import { BehaviorSubject } from 'rxjs';
import { Recording } from 'src/typings';

enum Directories {
  DIARY = "diary",
  IMAGINATION = "imagination"
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private diaryEntries: BehaviorSubject<Recording[]> = new BehaviorSubject([]);
  private imaginationEntries: BehaviorSubject<Recording[]> = new BehaviorSubject([]);

  constructor(
    private file: File
  ) {}

  async createNewFile(folder: string, fileName: string, type: string) {
    try {
      const location = await this.file.resolveDirectoryUrl(this.file.dataDirectory);
      const dir = await this.file.getDirectory(location, folder, { create: true });

      const file = await this.file.createFile(dir.nativeURL, fileName + ".m4a", true)
      this.updateEntries(type);
      return file.nativeURL;
    }
    catch(err) {
      throw err;
    }
  }
  async readFileAsArrayBuffer(fileUrl: string) {
    try {
      const location = await this.file.resolveLocalFilesystemUrl(fileUrl);
      const parent = await this.getParentDirectory(location);

      const file = await this.file.readAsArrayBuffer(parent.nativeURL, location.name);
      return file;
    }
    catch(err) {
      console.log(err);
    }
  }
  async deleteFile(path: string, type: string) {
    try {
      const location = await this.file.resolveLocalFilesystemUrl(path);
      await this.removeFile(location);
      await this.updateEntries(type);
    }
    catch(err) {
      console.log(err);
    }
  }
  async setFileName(fileUrl: string, fileName: string, type: string) {
    try {
      const file = await this.file.resolveLocalFilesystemUrl(fileUrl);
      const parent = await this.getParentDirectory(file);
      
      await this.moveFile(file, parent, fileName + ".m4a");
      await this.updateEntries(type); 
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
    const entries = await this.getEntries(folder);
    switch(folder) {
      case Directories.DIARY:
        this.diaryEntries.next(entries);
        break;
      case Directories.IMAGINATION:
        this.imaginationEntries.next(entries);
        break;
    }
  }

  async getEntries(folder: string) {
    try {
      const location = await this.file.resolveDirectoryUrl(this.file.dataDirectory);
      const dir = await this.file.getDirectory(location, folder, {create: true});

      const entries = await this.listFolderEntries(dir);
      const recordings: Recording[] = [];

      for (let entry of entries) {
        if (entry.name.includes(".m4a")) {
          try {
            const metadata = await this.getFileMetadata(entry);
            recordings.push({
              title: entry.name.replace(".m4a", ""),
              dateModified: metadata.modificationTime,
              fileUrl: entry.nativeURL
            })  
          }
          catch(err) {
            console.log("Error getting metadata: ", err);
            recordings.push({
              title: entry.name.replace(".m4a", ""),
              dateModified: new Date(),
              fileUrl: entry.nativeURL
            });
          }
        }
      }
      return recordings;
    }
    catch(err) {
      console.log(err);
    }
  }

  private listFolderEntries(dir: DirectoryEntry) {
    return new Promise<Entry[]>((resolve, reject) => {
      dir.createReader().readEntries(
        (entries => {
          resolve(entries);
        }),
        (err => {
          reject(err);
        })
      )
    })
  }

  private getFileMetadata(entry: Entry) {
    return new Promise<Metadata>((resolve, reject) => {
      entry.getMetadata(
        (metadata => {
          resolve(metadata);
        }),
        (err => {
          reject(err);
        })
      )
    })
  }

  private getParentDirectory(entry: Entry) {
    return new Promise<DirectoryEntry>((resolve, reject) => {
      entry.getParent(
        (parent => {
          resolve(parent);
        }),
        (err => {
          reject(err);
        }) 
      )
    })
  }
  
  private moveFile(entry: Entry, destination: DirectoryEntry, newFileName: string) {
    return new Promise<Entry>((resolve, reject) => {
      entry.moveTo(destination, newFileName, 
        (entry) => {
          resolve(entry)
        }),
        (err => {
          reject(err);
        })
    })
  }

  private removeFile(entry: Entry) {
    return new Promise<void>((resolve, reject) => {
      entry.remove(
        () => {
          resolve();
        },
        (err => {
          reject(err);
        })
      )
    })
  }

}