import { Component, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage{

  email: string = '';
  senha: string = '';
  confirmeSenha: string = '';
  nome: string = '';
  sobrenome: string ='';
  mensagemErro: string | null = null;
  mensagemCadastro: string | null = null;

  constructor(public nav: NavController, private firestore: AngularFirestore,private afAuth: AngularFireAuth) {

   }
   abrirPagina(x: any){
    this.nav.navigateForward(x)
  }

  async cadastrar() {
    // Limpa mensagens anteriores
    this.mensagemErro = '';
    this.mensagemCadastro = '';

    // Validação de e-mail
    if (!this.email || !this.validarEmail(this.email)) {
      this.mensagemErro = "E-mail inválido.";
      return;
    }

    // Validação de senha e confirmação
    if (!this.senha || this.senha.length < 6) {
      this.mensagemErro = "A senha deve ter pelo menos 6 caracteres.";
      return;
    }
    if (this.senha !== this.confirmeSenha) {
      this.mensagemErro = "As senhas não são iguais.";
      return;
    }

    try {
      // Deslogar para evitar sessão ativa
      await this.afAuth.signOut();

      // Verifica se o e-mail já está em uso
      const methods = await this.afAuth.fetchSignInMethodsForEmail(this.email);
      if (methods.length > 0) {
        this.mensagemErro = 'Este e-mail já está em uso. Tente outro ou faça login.';
        return;
      }

      // Criação do usuário
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.senha);
      const uid = userCredential.user?.uid;

      if (!uid) {
        throw new Error("Usuário não tem UID");
      }

      // Adiciona dados no Firestore
      await this.firestore.collection('usuarios').doc(uid).set({
        nome: this.nome,
        sobrenome: this.sobrenome,
        email: this.email,
      });

      this.mensagemCadastro = "CADASTRADO COM SUCESSO!";
      this.limparCampos();


    } catch (erro: any) {
      console.error("Erro no cadastro: ", erro);

      // Personaliza a mensagem de erro para o usuário
      if (erro.code === 'auth/email-already-in-use') {
        this.mensagemErro = 'Este e-mail já está em uso. Tente outro ou faça login.';
      } else if (erro.code === 'auth/invalid-email') {
        this.mensagemErro = 'O e-mail fornecido é inválido.';
      } else {
        this.mensagemErro = 'Erro no CADASTRO: ' + erro.message;
      }
    }
  }


validarEmail(email: string): boolean {
  // Validação básica de e-mail
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
limparCampos() {
  this.email = '';
  this.senha = '';
  this.nome = '';
  this.confirmeSenha="";
  this.sobrenome = '';
  
}

  aoInteragir() {
    this.mensagemCadastro= null;  // Oculta a mensagem ao interagir novamente
  }

}
