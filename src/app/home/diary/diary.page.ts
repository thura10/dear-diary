import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';
import { AddEntryPage } from '../add-entry/add-entry.page';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  entries: string[];

  constructor(
    private modalCtrl: ModalController,
    private database: DatabaseService,
    private platform: Platform
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    this.database.getDiaryEntries().subscribe((entries) => {
      console.log(entries);
    })
  }

  async addEntry() {
    const modal = await this.modalCtrl.create({
      component: AddEntryPage,
      componentProps: {
        type: "diary"
      }
    });
    await modal.present();
  }

}
