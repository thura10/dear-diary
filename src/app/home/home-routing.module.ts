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
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
      }
    ],
  },
  {
    path: '',
    redirectTo: 'home/diary'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
