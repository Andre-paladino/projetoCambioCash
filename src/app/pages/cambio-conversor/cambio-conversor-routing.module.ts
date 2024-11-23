import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioConversorPage } from './cambio-conversor.page';

const routes: Routes = [
  {
    path: '',
    component: CambioConversorPage,
  },
  {
    path: 'cambio-maps',
    loadChildren: () => import('../cambio-maps/cambio-maps.module').then(m => m.CambioMapsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CambioConversorPageRoutingModule {}
