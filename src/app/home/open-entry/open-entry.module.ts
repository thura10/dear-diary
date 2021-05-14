import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenEntryPageRoutingModule } from './open-entry-routing.module';

import { OpenEntryPage } from './open-entry.page';
import { AudioDurationPipe } from 'src/app/app.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenEntryPageRoutingModule
  ],
  declarations: [OpenEntryPage, AudioDurationPipe]
})
export class OpenEntryPageModule {}
