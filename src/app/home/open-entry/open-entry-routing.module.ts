import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenEntryPage } from './open-entry.page';

const routes: Routes = [
  {
    path: '',
    component: OpenEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenEntryPageRoutingModule {}
