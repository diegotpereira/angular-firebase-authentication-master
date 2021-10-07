import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { PainelComponent } from './componentes/painel/painel.component';
import { EntrarComponent } from './componentes/entrar/entrar.component';
import { InscreverSeComponent } from './componentes/inscrever-se/inscrever-se.component';
import { EsqueceuSenhaComponent } from './componentes/esqueceu-senha/esqueceu-senha.component';
import { VerificarEmailComponent } from './componentes/verificar-email/verificar-email.component';

// Serviço de autenticação
import { AuthService } from './compartilhado/servico/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    EntrarComponent,
    InscreverSeComponent,
    EsqueceuSenhaComponent,
    VerificarEmailComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
