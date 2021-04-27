import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEntryPage } from './add-entry/add-entry.page';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async addEntry() {
    const modal = await this.modalCtrl.create({
      component: AddEntryPage,
    });
    await modal.present();
  }

}
