import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  text = '';

  constructor(private file: File) { }

  ngOnInit() {
    this.text = this.file.documentsDirectory;
  }
  readFile() {
    this.file.readAsText(this.file.documentsDirectory, 'data.txt')
    .then((result) => {
      this.text = result;
    })
    .catch(err => {
    });
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

  export() {
    const zip: JSZip = new JSZip();
  }

}
