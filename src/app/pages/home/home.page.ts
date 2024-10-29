import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public imagemCambio = 'assets/icone-cambio.svg'

  constructor(public nav: NavController) {}

  abrirPagina(x: any){
    this.nav.navigateForward(x)
  }
}
