import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HabilidadeComponent } from './habilidade.component';

const appRoutes: Routes = [
  { path: 'list', component: HabilidadeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [HabilidadeComponent]
})
export class HabilidadeModule { }
