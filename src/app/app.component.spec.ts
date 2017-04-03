import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PersonagemService } from './modules/personagem/personagem.service';
import { HabilidadeService } from './modules/habilidade/habilidade.service';
import { AppModule } from './app.module';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        PersonagemService,
        HabilidadeService
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
    });
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have a navbar with ul'`, async(() => {
    const navbar: HTMLDivElement = fixture.debugElement.query(By.css('#navbar')).nativeElement;
    expect(navbar).not.toBeNull('navbar should exists');

    const lista = navbar.getElementsByTagName('ul');
    expect(lista).not.toBeNull('lista(ul) should exists');
  }));

});
