import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AddEntryPageModule } from './add-entry/add-entry.module';
import { OpenEntryPageModule } from './open-entry/open-entry.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AddEntryPageModule,
    OpenEntryPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
