import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'audioDuration'})
export class AudioDurationPipe implements PipeTransform {
  transform(value: number): string {
    let seconds = Math.floor(value);
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
export class AppComponent {
  constructor() {}
}
