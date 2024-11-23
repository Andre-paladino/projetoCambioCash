import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  senha: string = '';
  isLoading: boolean = false;
  mensagemErro: string = '';
  nomeUsuario: string | null = null;
  loggedIn: boolean = false;

  constructor(
    public nav: NavController,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  abrirPagina(x: any) {
    this.nav.navigateForward(x);
  }

  ngOnInit() {
    console.log("iniciou")
  }



  async login() {
    //this.isLoading = true;
    this.mensagemErro = '';

    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.senha);
      this.loggedIn = true;
      console.log('Usuário logado com sucesso!');
      this.abrirPagina('cambio-conversor');
    } catch (erro) {
      this.mensagemErro = 'Erro: e-mail ou senha incorretos.';
      console.error('Erro no login: ', erro);
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('Logout bem-sucedido.');
        this.loggedIn = false;
        this.email = '';
        this.senha = '';
        this.nomeUsuario = '';
        //this.abrirPagina('login'); // Navega para a página de login após logout
        this.afAuth.authState.subscribe((user) => {
          if (!user) {
            console.log('Usuário não autenticado.');
            this.abrirPagina('login');
          }
        });
      })
      .catch((error) => {
        console.error('Erro ao deslogar:', error);
        this.mensagemErro = 'Erro ao tentar fazer logout.';
      });
  }
}
