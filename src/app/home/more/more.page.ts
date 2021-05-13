import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  text = '';

  constructor(private file: File, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.text = this.file.documentsDirectory;
  }
  async readFile() {

  }
  writeFile() {
    const text = 'Data Written' + Math.floor(Math.random() * 101);
    this.file.writeFile(this.file.documentsDirectory, 'data.txt', text)
    .then(() => {
      this.readFile();
    })
    .catch(err => {
    });
    this.file.writeExistingFile(this.file.documentsDirectory, 'data.txt', text)
    .then(() => {
      this.readFile();
    })
    .catch(err => {
    });
  }

  async export() {
    const zip: JSZip = new JSZip();
    const folder = zip.folder(this.file.documentsDirectory);

    const exists = await this.file.checkFile(this.file.tempDirectory, 'temp.zip');
    if (exists) {
      await this.file.removeFile(this.file.tempDirectory, 'temp.zip');
    }
    const exportFile = await folder.generateAsync({type: 'arraybuffer'});

    const filePath = await this.file.writeFile(this.file.tempDirectory, 'temp.zip', exportFile);
    this.socialSharing.share(null, null, filePath);
  }

}
