import {Component, ViewChild} from '@angular/core';
import { Howl } from 'howler';
import {IonRange} from '@ionic/angular';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   playlist: Track[] = [
      {
        name: 'Bey T - If They Dunno',
        path: './assets/mp3/audio1.mp3'
      },
    {
      name: 'Bey T - Just Admit It',
      path: './assets/mp3/audio2.mp3'
    },
    {
      name: 'Ethic Entertainment & Boondocks Gang - THAO',
      path: './assets/mp3/audio3.mp3'
    },
    {
      name: 'Grimm - Radioactive',
      path: './assets/mp3/audio4.mp3'
    }
  ];

   activeTrack: Track = null;
   player: Howl = null;
   isPlaying = false;
   progress = 0;
   @ViewChild('range', {static: false}) range: IonRange;

  constructor() {}

  start(track: Track) {
      if (this.player) {
          this.player.stop();
      }
      this.player = new Howl({
          src: [track.path],
          html5: true,
          onplay: () => {
              console.log('onplay');
              this.isPlaying = true;
              this.activeTrack = track;
              this.updateProgress();
          },
          onend: () => {
              console.log('onend');
          }
      });
      this.player.play();
  }

  togglePlayer(pause) {
      this.isPlaying = !pause;
      if (pause) {
          console.log('playback paused');
          this.player.pause();
      } else {
          console.log('playback resumed');
          this.player.play();
      }
  }

  next() {
      console.log('next track');
      const index = this.playlist.indexOf(this.activeTrack);
      if (index !== this.playlist.length - 1) {
          this.start(this.playlist[index + 1]);
      } else {
          this.start(this.playlist[0]);
      }
  }

  prev() {
      console.log('previous track');
      const index = this.playlist.indexOf(this.activeTrack);
      if (index > 0) {
          this.start(this.playlist[index - 1]);
      } else {
          this.start(this.playlist[this.playlist.length - 1]);
      }
  }

  seek() {
    const newValue = + this.range.value;
    const duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
      const seek = this.player.seek();
      this.progress = (seek / this.player.duration()) * 100 || 0;
      setTimeout(() => {
          this.updateProgress();
      }, 1000);
  }

}
