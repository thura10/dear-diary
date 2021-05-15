import { Component, Input, OnInit } from '@angular/core';
import { Media, MediaObject, MEDIA_STATUS } from '@ionic-native/media/ngx';
import { Subscription, timer } from 'rxjs';
import { Recording } from 'src/typings';
import { ModalController } from '@ionic/angular';
import { Insomnia } from '@ionic-native/insomnia/ngx';

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
  isSeeking: boolean;

  duration: number = 0;
  currentPosition: number = 0;
  seekPosition: number = 0;

  timer: Subscription;

  constructor(
    private media: Media,
    private modalCtrl: ModalController,
    private insomnia: Insomnia
  ) { }

  async ngOnInit() {
    this.insomnia.keepAwake();

    this.mediaFile = this.media.create(this.entry.fileUrl);

    this.mediaFile.play({playAudioWhenScreenIsLocked: true});
    this.isPlaying = true;

    this.mediaFile.onStatusUpdate.subscribe((status) => {
      if (status === MEDIA_STATUS.STOPPED) {
        this.isPlaying = false;
        this.currentPosition = this.duration;
      }
    })

    this.timer = timer(0, 1000).subscribe(async (elapsedCycles) => {
      if (this.isPlaying && !this.isSeeking) {
        try {
          const position = await this.mediaFile.getCurrentPosition();
          this.currentPosition = Math.round(position);
        }
        catch(err) {
          console.log(err);
        }
      }
    })

    setTimeout(() => {
      this.duration = this.mediaFile.getDuration();
    }, 500);

    this.modal.onWillDismiss()
    .then((result) => {
      this.timer.unsubscribe();
      this.insomnia.allowSleepAgain();
      
      if (this.mediaFile) {
        this.mediaFile.stop();
        this.mediaFile.release();
      }
    })
  }

  togglePlayback() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.insomnia.allowSleepAgain();
      this.mediaFile.pause();
    }
    else {
      this.isPlaying = true;
      this.insomnia.keepAwake();
      this.mediaFile.play({playAudioWhenScreenIsLocked: true});
    }
  }

  onSeekStart() {
    this.isSeeking = true;
  }
  onSeekEnd() {
    this.isSeeking = false;
    this.mediaFile.seekTo(this.seekPosition*1000);
  }

  seek(event: any) {
    const seconds = event.target.value;
    this.seekPosition = seconds;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
