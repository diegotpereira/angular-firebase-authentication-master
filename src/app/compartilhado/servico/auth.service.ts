import { Injectable, NgZone } from '@angular/core';
import { User }  from '../servico/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDado: any; // Salvar dados do usuário conectado
 

  constructor(
    public afs: AngularFirestore, // Injetar serviço Firestore
    public afAuth: AngularFireAuth, // Injetar serviço de autenticação do Firebase
    public ngZone: NgZone, // Serviço NgZone para remover aviso de escopo externo
    public router: Router
  ) {

    // Salvar dados do usuário no armazenamento local quando
    // conectado e configurando nulo quando desconectado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usuarioDado = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDado));
        JSON.parse(localStorage.getItem('user') !);
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') !);
      }
    })
  }


   // Entrar com e-mail/senha
   Entrar(email: any, password: any) {
     return this.afAuth.signInWithEmailAndPassword(email,password)
     .then((result) => {
       this.ngZone.run(() => {
         this.router.navigate(['painel']);
       });
       this.definirDadosUsuario(result.user);
     }).catch((error: { message: any; }) => {
       window.alert(error.message)
     })
   }

   // Cadastre-se com e-mail/senha
   InscreverSe(email: any, password: any) {
     return this.afAuth.createUserWithEmailAndPassword(email, password)
     .then((result) => {
       // Chame a função SendVerificaitonMail () quando o novo usuário assinar
       // e retorna promise
       this.EnviarMensagemDeVerificacao();
       this.definirDadosUsuario(result.user);
     }).catch((error: { message: any; }) => {
       window.alert(error.message)
     })
   }

   // Enviar verificação de e-mail quando um novo usuário se inscrever
   EnviarMensagemDeVerificacao() {
    // return this.afAuth.currentUser.then((user) => {
    //   if (user != null) {
    //     return user.sendEmailVerification();
        
    //   }
      
    // }).then(() => {
    //   this.router.navigate(['verify-email-address']);
    // })
  }
  //  SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }
  //  async SendVerificationMail() {
  //   (await this.afAuth.currentUser).sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email']);
  //   })   }
  //  SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email']);
  //   })
  // }
  //  EnviarMensagemDeVerificacao() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   // return this.afAuth.currentUser.then(u => u.sendEmailVerification())
  //   // .then(() => {
  //   //   this.router.navigate(['verify-email']);
  //   // })
  // }  
  //  EnviarMensagemDeVerificacao() {
  //    return this.afAuth.currentUser.sendEmailVerification()
  //    .then(() => {
  //      this.router.navigate(['verifique-endereco-email']);
  //    })
  //  }

   // Redefinir senha esquecida
   RedefinirSenha(senhaDeRedefinicaoDeEmail: any) {
     return this.afAuth.sendPasswordResetEmail(senhaDeRedefinicaoDeEmail)
     .then(() => {
       window.alert('Email de redefinição de senha enviado, verifique sua caixa de entrada.');
     }).catch((error: any) => {
       window.alert(error)
     })
   }

   // Retorna verdadeiro quando o usuário está conectado e o e-mail é verificado
   get estaLogado(): boolean {
     const user = JSON.parse(localStorage.getItem('user') !);
     return (user !== null && user.emailVerificado !== false) ? true : false;
   }

   // Faça login no Google
   GoogleAuth () {
     return this.AuthLogin(new auth.GoogleAuthProvider());
   }

   FacebookAuth() {
     return this.AuthLogin(new auth.FacebookAuthProvider());
   }

   // Lógica de autenticação para executar provedores de autenticação
   AuthLogin(provider: auth.GoogleAuthProvider | auth.FacebookAuthProvider) {
     return this.afAuth.signInWithPopup(provider)
     .then((result) => {
       this.ngZone.run(() => {
         this.router.navigate(['painel']);
       })
       this.definirDadosUsuario(result.user);
     }).catch((error: any) => {
       window.alert(error)
     })
   }

   // Configurando dados do usuário ao fazer login com nome de usuario/senha,
   // inscreva-se com nome de usuário/senha e faça login com autenticação social
   // provedor no banco de dados Firestore usando o serviço AngularFirestore + AngularFirestoreDocument
   
   definirDadosUsuario(user) {
     const usuarioRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
     const usuarioDado: User = {
       uid: user.uid,
       email: user.email,
       nomeEmExibicao: user.nomeEmExibicao,
       fotoUrl: user.fotoUrl,
       emailVerificado: user.emailVerificado
     }
     return usuarioRef.set(usuarioDado, {
       merge: true
     })
   }

   // Sair
   Sair() {
     return this.afAuth.signOut().then(() => {
       localStorage.removeItem('user');
       this.router.navigate(['entrar']);
     })
   }
}
