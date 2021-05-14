import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Pipe({name: 'audioDuration'})
export class AudioDurationPipe implements PipeTransform {
  transform(value: number, round?: boolean): string {
    if (value === -1) value = 0;
    let seconds = round ? Math.round(value) : Math.floor(value);
    if (seconds < 60) {
      return `00:${seconds.toString().padStart(2, '0')}`
    }
    return `${Math.floor(seconds/60).toString().padStart(2, '0')}:${seconds%60}`;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private statusBar: StatusBar
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    this.statusBar.styleDefault();
  }
}
