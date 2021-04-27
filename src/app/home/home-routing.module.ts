import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'entries',
        loadChildren: () => import('./entries/entries.module').then( m => m.EntriesPageModule)
      },
      {
        path: 'scenarios',
        loadChildren: () => import('./scenarios/scenarios.module').then( m => m.ScenariosPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('./more/more.module').then( m => m.MorePageModule)
      }
    ],
  },
  {
    path: '',
    redirectTo: 'home/entries'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
