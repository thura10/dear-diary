import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';
import { Entry } from 'src/typings';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})
export class AddEntryPage implements OnInit {

  entries: Entry[];

  constructor(
    private database: DatabaseService,
    private modal: ModalController
    ) { }

  ngOnInit() {
    this.database.getDatabaseState().subscribe((isReady) => {
      if (isReady) {
        this.database.getEntries().subscribe((entries) => {
          this.entries = entries;
        });
      }
    });
  }

  addEntry() {
    this.database.addEntry('new1', 'DeSC', 'SDKFJSDLFJD', './././.', ['tag1', 'tag2']);
  }

  dismiss() {
    this.modal.dismiss();
  }

}
