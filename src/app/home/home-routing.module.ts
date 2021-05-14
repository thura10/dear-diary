import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'diary',
        loadChildren: () => import('./diary/diary.module').then( m => m.DiaryPageModule)
      },
      {
        path: 'imagination',
        loadChildren: () => import('./imagination/imagination.module').then( m => m.ImaginationPageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('./more/more.module').then( m => m.MorePageModule)
      }
    ],
  },
  {
    path: '',
    redirectTo: 'home/diary'
  },
  {
    path: 'open-entry',
    loadChildren: () => import('./open-entry/open-entry.module').then( m => m.OpenEntryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
