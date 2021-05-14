import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';
import { Recording } from 'src/typings';
import { AddEntryPage } from '../add-entry/add-entry.page';
import { OpenEntryPage } from '../open-entry/open-entry.page';

@Component({
  selector: 'app-imagination',
  templateUrl: './imagination.page.html',
  styleUrls: ['./imagination.page.scss'],
})
export class ImaginationPage implements OnInit {

  type = "imagination";
  entries: Recording[];
  filteredEntries: Recording[];

  searchBar: FormControl = new FormControl("");

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private database: DatabaseService,
    private platform: Platform
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    this.database.getImaginationEntries().subscribe((entries) => {
      this.entries = entries;
      this.filteredEntries = entries;
      this.searchBar.reset();
    })
    this.searchBar.valueChanges.subscribe((query: string) => {
      if (query) {
        this.filteredEntries = this.entries.filter((entry) => entry.title.toLowerCase().includes(query.toLowerCase()));
      }
      else this.filteredEntries = this.entries;
    })
  }

  async addEntry() {
    const modal = await this.modalCtrl.create({
      component: AddEntryPage,
      componentProps: {
        type: this.type
      },
      cssClass: 'card-modal',
      swipeToClose: true,
      showBackdrop: false
    });
    await modal.present();
  }

  async openEntry(entry: Recording) {
    const modal = await this.modalCtrl.create({
      component: OpenEntryPage,
      componentProps: {
        type: this.type,
        entry: entry
      },
      cssClass: 'half-height-modal',
      swipeToClose: true,
      showBackdrop: true,
      backdropDismiss: true
    });
    await modal.present();
  }

  async removeEntry(entry: Recording) {
    const alert = await this.alertCtrl.create({
      header: "Delete this recording?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, 
        {
          text: 'Delete',
          handler: async() => {
            await this.database.deleteFile(entry.fileUrl, this.type)
          }
        }
      ]
    });
    await alert.present();
  }

}
