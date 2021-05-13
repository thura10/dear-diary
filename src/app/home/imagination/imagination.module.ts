import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImaginationPageRoutingModule } from './imagination-routing.module';

import { ImaginationPage } from './imagination.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImaginationPageRoutingModule
  ],
  declarations: [ImaginationPage]
})
export class ImaginationPageModule {}
