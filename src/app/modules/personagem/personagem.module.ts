import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonagemComponent } from './personagem.component';

const appRoutes: Routes = [
  { path: 'list', component: PersonagemComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PersonagemComponent]
})
export class PersonagemModule { }
