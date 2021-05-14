import { Component, Input, OnInit } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';
import { Subscription, timer } from "rxjs";
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
  animations: [
    trigger("sound-bar", [
      transition(":enter", [
        style({ height: "{{previousBarWidth}}px" }),
        animate('150ms ease-out', style({ height: "*" })),
      ], {params: { previousBarWidth: "8px" }})
    ])
  ]
})
export class AddEntryPage implements OnInit {

  @Input() type: string;
  today = Date.now();
  mediaFile: MediaObject;
  fileUrl: string;

  timer: Subscription;
  duration: number = 0;
  amplitude: number[] = new Array(70).fill(8);

  isRecording: boolean;

  constructor(
    private database: DatabaseService,
    private modal: ModalController,
    private media: Media
  ) { }

  async ngOnInit() {
    this.database.createNewFile(this.type, this.today.toString())
    .then((url) => {
      this.fileUrl = url;

      this.mediaFile = this.media.create(url.replace(/^file:\/\//, ''));
      this.mediaFile.startRecord();
      this.isRecording = true;

      this.timer = timer(0, 100).subscribe((elapsedCycles) => {
        if (this.isRecording) {
          this.duration += 0.1;
          this.mediaFile.getCurrentAmplitude()
          .then((amp) => {
            if (amp < 0.08) amp = 0.08;
            this.amplitude.push(amp*100);
          })
          .catch(err => {
            console.log("Error getting amp: ", err);
          })
        }
      })
    })
    .catch((err) => {
      console.log("Create ERR: ", err);
    })
  }

  toggleRecord() {
    if (this.isRecording) {
      this.isRecording = false;
      this.mediaFile.pauseRecord();
    }
    else {
      this.isRecording = true;
      this.mediaFile.startRecord();
    }
  }

  addEntry() {

  }

  dismiss() {
    if (this.mediaFile) {
      this.timer.unsubscribe();

      this.mediaFile.stopRecord();
      this.mediaFile.release();
      
      this.database.removeFile(this.fileUrl);
    }
    this.modal.dismiss({}, "cancel");
  }

  getPreviousBarWidth() {
    return this.amplitude[this.amplitude.length-1];
  }

}
