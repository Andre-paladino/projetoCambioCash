import { Component, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage{

  email: string = '';
  senha: string = '';

  constructor(public nav: NavController, private afAuth: AngularFireAuth) {
    
   }
   abrirPagina(x: any){
    this.nav.navigateForward(x)
  }

   cadastrar() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.senha)
      .then(() => {
        console.log('Usuário criado com sucesso!'); 
      })
      .catch(erro => {
        console.error("Erro no cadastro: ", erro); 
      });

}
}