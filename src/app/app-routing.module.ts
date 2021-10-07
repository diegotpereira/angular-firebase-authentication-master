import { NgModule } from '@angular/core';

// Serviços necessários para navegação.
import { RouterModule, Routes } from '@angular/router';

// Importar todos os componentes para os quais o serviço de navegação deve ser ativado.
import { EntrarComponent } from './componentes/entrar/entrar.component';
import { InscreverSeComponent } from './componentes/inscrever-se/inscrever-se.component';
import { PainelComponent } from './componentes/painel/painel.component';
import { EsqueceuSenhaComponent } from './componentes/esqueceu-senha/esqueceu-senha.component';
import { AuthGuard } from "./compartilhado/guard/auth.guard";
import { VerificarEmailComponent } from './componentes/verificar-email/verificar-email.component';


const routes: Routes = [

  {
    path: '', redirectTo:'/entrar', pathMatch: 'full'
  },
  {
    path: 'entrar', component: EntrarComponent
  },
  {
    path: 'registrar-usuario', component: InscreverSeComponent
  },
  {
    path: 'painel', component: PainelComponent, canActivate: [AuthGuard]
  },
  {
    path: 'esqueceu-senha', component: EsqueceuSenhaComponent
  },
  { 
    path: 'verifique-endereco-email', component: VerificarEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
