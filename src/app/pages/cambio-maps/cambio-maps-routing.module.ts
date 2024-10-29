import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioMapsPage } from './cambio-maps.page';

const routes: Routes = [
  {
    path: '',
    component: CambioMapsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioMapsPageRoutingModule {}
