import { HabilidadeService } from './../habilidade.service';
import { AppRoutingModule } from './../../../app.routing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { HabilidadeModule } from './../habilidade.module';
import { HabilidadeComponent } from './../habilidade.component';

fdescribe('HabilidadeComponent', () => {
  let component: HabilidadeComponent;
  let fixture: ComponentFixture<HabilidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HabilidadeModule, HttpModule, AppRoutingModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        HabilidadeService
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HabilidadeComponent);
      fixture.detectChanges();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
