import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioConversorPageRoutingModule } from './cambio-conversor-routing.module';

import { CambioConversorPage } from './cambio-conversor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioConversorPageRoutingModule
  ],
  declarations: [CambioConversorPage]
})
export class CambioConversorPageModule {}
