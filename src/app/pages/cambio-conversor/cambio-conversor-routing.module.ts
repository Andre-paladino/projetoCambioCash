import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioConversorPage } from './cambio-conversor.page';

const routes: Routes = [
  {
    path: '',
    component: CambioConversorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioConversorPageRoutingModule {}
