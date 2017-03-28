import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonagemService } from './modules/personagem/personagem.service';
import { HabilidadeService } from './modules/habilidade/habilidade.service';
import { AppModule } from './app.module';

fdescribe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        PersonagemService,
        HabilidadeService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have a navbar with ul'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const navbar: HTMLDivElement = fixture.debugElement.query(By.css('#navbar')).nativeElement;
    expect(navbar).not.toBeNull('navbar should exists');

    const lista = navbar.getElementsByTagName('ul');
    expect(lista).not.toBeNull('lista(ul) should exists');
  }));

});
