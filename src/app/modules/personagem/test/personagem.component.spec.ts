import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { PersonagemComponent } from './../personagem.component';
import { PersonagemService } from './../personagem.service';
import { HabilidadeService } from './../../habilidade/habilidade.service';
import { AppRoutingModule } from './../../../app.routing';
import { HttpModule } from '@angular/http';
import { PersonagemModule } from './../personagem.module';
import { Personagem } from './../personagem.model';
import { personagens } from './personagem.stub';

describe('PersonagemComponent', () => {
  let component: PersonagemComponent;
  let fixture: ComponentFixture<PersonagemComponent>;
  let personagemService: any;
  let habilidadeService: any;

  beforeEach(async(() => {

    habilidadeService = jasmine.createSpyObj('habilidadeService', ['getHabilidades']);
    habilidadeService.getHabilidades.and.callFake(() => Promise.resolve([{ codigo: '1', nome: 'Voar' }, { codigo: '2', nome: 'Força' }]));
    
    personagemService = jasmine.createSpyObj(
      'personagemService', ['postPersonagem', 'getPersonagens', 'patchPersonagem', 'deletePersonagem']);

    personagemService.getPersonagens.and.callFake(() => Promise.resolve([personagens]
    ));
    personagemService.postPersonagem.and.callFake(() => Promise.resolve({}));
    personagemService.patchPersonagem.and.callFake(() => Promise.resolve({}));
    personagemService.deletePersonagem.and.callFake(() => Promise.resolve({}));


    TestBed.configureTestingModule({
      imports: [PersonagemModule, HttpModule, AppRoutingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: PersonagemService, useValue: personagemService },
        { provide: HabilidadeService, useValue: habilidadeService }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(PersonagemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have personagem value', () => {
    const personagem: Personagem = { codigo: null, nome: 'Hulk', companhia: 'Marvel',
                                      habilidades: [ {habilidade: {codigo: '2', nome: 'Força'} }] };
    component.form.patchValue(personagem);
    fixture.detectChanges();

    const codigoPersonagem: string = component.form.get('codigo').value;
    const nomePersonagem: string = component.form.get('nome').value;
    const habilidades: string = component.form.get('habilidades').value;
    
    expect(codigoPersonagem).toBeNull('should be null');
    expect(nomePersonagem).toEqual('Hulk', 'should be equals "Hulk"');
    expect(habilidades.length).toBe(1, 'length should be 1');
  });

  it('button salvar should be disabled', () => {
    const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSave')).nativeElement;
    expect(component.form.invalid).toBeTruthy('should be invalid');
    expect(salvar.disabled).toBeTruthy('should be disabled because form is invalid');
  });

  it('should save a new personagem', (done) => {
    const personagem: Personagem = { codigo: null, nome: 'Hulk', companhia: 'Marvel',
                                      habilidades: [ {habilidade: {codigo: '2', nome: 'Força'} }] };
    component.form.patchValue(personagem);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSave')).nativeElement;
      expect(salvar).toBeDefined();
      expect(salvar.disabled).toBeFalsy();

      salvar.click();

      expect(personagemService.postPersonagem).toHaveBeenCalledTimes(1);
      expect(personagemService.getPersonagens).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should patch personagem', (done) => {
    const personagem: Personagem = { codigo: '2', nome: 'Hulk', companhia: 'Marvel',
                                      habilidades: [ {habilidade: {codigo: '2', nome: 'Força'} }] };
    component.form.patchValue(personagem);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSave')).nativeElement;
      expect(salvar).toBeDefined();
      expect(salvar.disabled).toBeFalsy();

      salvar.click();

      expect(personagemService.patchPersonagem).toHaveBeenCalledTimes(1);
      expect(personagemService.getPersonagens).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should delete personagem', (done) => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const deletar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnDelete')).nativeElement;
      expect(deletar).toBeDefined();

      deletar.click();

      expect(personagemService.deletePersonagem).toHaveBeenCalledTimes(1);
      expect(personagemService.getPersonagens).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should edit personagem', (done) => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const editar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnEdit')).nativeElement;
      expect(editar).toBeDefined();

      editar.click();

      expect(component.form.value).toEqual(personagens);
      done();
    });
  });

  it('should has 1 element', (done) => {

    expect(personagemService.getPersonagens).toHaveBeenCalledTimes(1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.personagens.length).toBe(1);
      done();
    });
  });

  it('should has 2 elements - with header row', (done) => {
    const lista: HTMLTableElement = fixture.debugElement.query(By.css('table#lista')).nativeElement;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(lista.rows.length).toBe(2, 'should has 2 rows - with header row');
      done();
    });
  });

  it('should show edit and delete buttons', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const editButton: HTMLButtonElement = fixture.debugElement.query(By.css('#btnEdit')).nativeElement;
      const deleteButton: HTMLButtonElement = fixture.debugElement.query(By.css('#btnDelete')).nativeElement;
      expect(editButton).toBeDefined('edit button should be defined');
      expect(deleteButton).toBeDefined('delete button should be defined');
      done();
    });
  });

});
