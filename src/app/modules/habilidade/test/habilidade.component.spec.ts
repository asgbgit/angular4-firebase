import { By } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import { Habilidade } from './../habilidade.model';
import { HabilidadeService } from './../habilidade.service';
import { AppRoutingModule } from './../../../app.routing';
import { HabilidadeModule } from './../habilidade.module';
import { HabilidadeComponent } from './../habilidade.component';

describe('HabilidadeComponent', () => {
  let component: HabilidadeComponent;
  let fixture: ComponentFixture<HabilidadeComponent>;
  let habilidadeService: any;

  beforeEach(async(() => {

    habilidadeService = jasmine.createSpyObj(
      'habilidadeService', ['postHabilidade', 'getHabilidades', 'patchHabilidade', 'deleteHabilidade']);

    habilidadeService.getHabilidades.and.callFake(() => Observable.of([{ codigo: '1', nome: 'Força' }]));
    habilidadeService.postHabilidade.and.callFake(() => Observable.of({}));
    habilidadeService.patchHabilidade.and.callFake(() => Observable.of({}));
    habilidadeService.deleteHabilidade.and.callFake(() => Observable.of({}));

    TestBed.configureTestingModule({
      imports: [HabilidadeModule, HttpModule, AppRoutingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: HabilidadeService, useValue: habilidadeService }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HabilidadeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have habilidade value', () => {
    const habilidade: Habilidade = { codigo: null, nome: 'Força' };
    component.form.patchValue(habilidade);
    fixture.detectChanges();

    const codigoHabilidade: string = component.form.get('codigo').value;
    const nomeHabilidade: string = component.form.get('nome').value;
    expect(codigoHabilidade).toBeNull('should be null');
    expect(nomeHabilidade).toEqual('Força', 'should be equals "Força"');
  });

  it('button salvar should be disabled', () => {
    const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSave')).nativeElement;
    expect(component.form.invalid).toBeTruthy('should be invalid');
    expect(salvar.disabled).toBeTruthy('should be disabled because form is invalid');
  });

  it('should save a new habilidade', (done) => {
    const habilidade: Habilidade = { codigo: null, nome: 'Força' };
    component.form.patchValue(habilidade);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSave')).nativeElement;
      expect(salvar).toBeDefined();
      expect(salvar.disabled).toBeFalsy();

      salvar.click();

      expect(habilidadeService.postHabilidade).toHaveBeenCalledTimes(1);
      expect(habilidadeService.getHabilidades).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should patch habilidade', (done) => {
    const habilidade: Habilidade = { codigo: '1', nome: 'Força' };
    component.form.patchValue(habilidade);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const salvar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnSave')).nativeElement;
      expect(salvar).toBeDefined();
      expect(salvar.disabled).toBeFalsy();

      salvar.click();

      expect(habilidadeService.patchHabilidade).toHaveBeenCalledTimes(1);
      expect(habilidadeService.getHabilidades).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should delete habilidade', (done) => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const deletar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnDelete')).nativeElement;
      expect(deletar).toBeDefined();

      deletar.click();

      expect(habilidadeService.deleteHabilidade).toHaveBeenCalledTimes(1);
      expect(habilidadeService.getHabilidades).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should edit personagem', (done) => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const editar: HTMLButtonElement = fixture.debugElement.query(By.css('#btnEdit')).nativeElement;
      expect(editar).toBeDefined();

      editar.click();

      expect(component.form.value).toEqual({ codigo: '1', nome: 'Força' });
      done();
    });
  });

  it('deve haver 1 item na lista', (done) => {

    expect(habilidadeService.getHabilidades).toHaveBeenCalledTimes(1);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.habilidades.length).toBe(1);
      done();
    });
  });

  it('deve haver 2 itens na lista <table>', (done) => {
    const lista: HTMLTableElement = fixture.debugElement.query(By.css('table#lista')).nativeElement;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(lista.rows.length).toBe(2, 'deve haver pelos menos 2 linhas'); //incluindo a linha do header
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
