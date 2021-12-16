import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { IndexesComponent } from './indexes.component';

const routes: Routes = [
  {
    path: '',
    component: IndexesComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [IndexesComponent]
})
export class IndexesModule {}
