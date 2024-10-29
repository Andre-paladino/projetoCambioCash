import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioMapsPageRoutingModule } from './cambio-maps-routing.module';

import { CambioMapsPage } from './cambio-maps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioMapsPageRoutingModule
  ],
  declarations: [CambioMapsPage]
})
export class CambioMapsPageModule {}
