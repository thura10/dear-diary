import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEntryPage } from '../add-entry/add-entry.page';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async addEntry() {
    const modal = await this.modalCtrl.create({
      component: AddEntryPage,
      componentProps: {
        type: "Diary"
      }
    });
    await modal.present();
  }

}
