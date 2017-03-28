import { NgModule, OnInit } from '@angular/core';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    HomeRoutingModule
  ],
  exports: [],
  declarations: [HomeComponent],
})
export class HomeModule { 

}
