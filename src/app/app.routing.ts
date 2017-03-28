import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'habilidade', loadChildren: './modules/habilidade/habilidade.module#HabilidadeModule', canActivate: [AuthGuard]},
  { path: 'personagem', loadChildren: './modules/personagem/personagem.module#PersonagemModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
