import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImaginationPage } from './imagination.page';

const routes: Routes = [
  {
    path: '',
    component: ImaginationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImaginationPageRoutingModule {}
