import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { HabilidadeService } from './modules/habilidade/habilidade.service';
import { PersonagemService } from './modules/personagem/personagem.service';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HomeModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    PersonagemService,
    HabilidadeService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
