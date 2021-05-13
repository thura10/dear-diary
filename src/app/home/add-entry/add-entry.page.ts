import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})
export class AddEntryPage implements OnInit {

  @Input() type: string;

  constructor(
    private database: DatabaseService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    
  }

  addEntry() {

  }

  dismiss() {
    this.modal.dismiss();
  }

}
