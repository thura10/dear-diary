import { Component, Input, OnInit } from '@angular/core';
import { Media, MediaObject, MEDIA_STATUS } from '@ionic-native/media/ngx';
import { DatabaseService } from 'src/app/database.service';
import { Subscription, timer } from 'rxjs';
import { Recording } from 'src/typings';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-open-entry',
  templateUrl: './open-entry.page.html',
  styleUrls: ['./open-entry.page.scss'],
})
export class OpenEntryPage implements OnInit {

  private modal: HTMLIonModalElement;

  @Input() type: string;
  @Input() entry: Recording;

  mediaFile: MediaObject;
  isPlaying: boolean;

  duration: number = 0;
  currentPosition: number = 0;

  timer: Subscription;

  constructor(
    private media: Media,
    private database: DatabaseService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.mediaFile = this.media.create(this.entry.fileUrl.replace(/^file:\/\//, ''));

    this.mediaFile.play({playAudioWhenScreenIsLocked: false});
    this.isPlaying = true;

    this.mediaFile.onStatusUpdate.subscribe((status) => {
      if (status === MEDIA_STATUS.STOPPED) {
        this.isPlaying = false;
        this.currentPosition = this.duration;
      }
    })

    this.timer = timer(0, 1000).subscribe(async (elapsedCycles) => {
      if (this.isPlaying) {
        this.currentPosition = Math.round(await this.mediaFile.getCurrentPosition());
      }
    })

    setTimeout(() => {
      this.duration = this.mediaFile.getDuration();
    }, 500);

    this.modal.onWillDismiss()
    .then((result) => {
      this.timer.unsubscribe();
      if (this.mediaFile) {
        this.mediaFile.stop();
        this.mediaFile.release();
      }
    })
  }

  togglePlayback() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.mediaFile.pause();
    }
    else {
      this.isPlaying = true;
      this.mediaFile.play({playAudioWhenScreenIsLocked: false});
    }
  }

  seek(event: any) {
    const seconds = event.target.value;
    this.mediaFile.seekTo(seconds*1000);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
