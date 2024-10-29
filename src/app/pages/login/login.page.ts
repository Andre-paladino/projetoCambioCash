import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  senha: string = "";
  isLoading: boolean = false;
  mensagemErro: string = "";
  constructor(public nav: NavController, public afAuth: AngularFireAuth) {
  }

  abrirPagina(x: any){
    this.nav.navigateForward(x)
  }

  async login() {
    this.isLoading = true;
    this.mensagemErro = ''; // Limpa a mensagem de erro

    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.senha);
      console.log('Usuário logado com sucesso!');
      this.abrirPagina("cambio-conversor");
    } catch (erro) {
      this.mensagemErro = 'Erro: e-mail ou senha incorretos.';
      console.error("Erro no login: ", erro);
    } finally {
      this.isLoading = false; // Finaliza o estado de carregamento
    }
  }
  logout() {
    this.afAuth.signOut().then(()=>{
      console.log("saiu");
      this.email="";
      this.senha="";
    }); 
  }

}
