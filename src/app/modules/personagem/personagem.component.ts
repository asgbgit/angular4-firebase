import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { AlertMessage } from './../../common/domain/alert-message.model';
import { SuperComponent } from './../../common/resource/super-component';
import { PersonagemService } from './personagem.service';
import { HabilidadeService } from './../habilidade/habilidade.service';
import { Personagem } from './personagem.model';
import { Habilidade } from './../habilidade/habilidade.model';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html'
})
export class PersonagemComponent extends SuperComponent implements OnInit {

  form: FormGroup;

  personagens: Personagem[];

  listaHabilidades: Habilidade[];

  constructor(private formBuilder: FormBuilder,
              private personagemService: PersonagemService,
              private habilidadeService: HabilidadeService) {
    super();
  }

  ngOnInit() {
    this.loadHabilidades();
    this.createForm();
    this.reload();
  }

  public createForm() {
    this.form = this.formBuilder.group({
      codigo: [],
      nome: ['', Validators.required],
      companhia: ['', Validators.required],
      habilidades: this.formBuilder.array([
        this.initHabilidade()
      ])
    });
  }

  initHabilidade() {
    return this.formBuilder.group({
      habilidade: this.formBuilder.control({
        codigo: ['', Validators.required],
        nome: ['', Validators.required],
      })
    });
  }

  private reload() {
    this.personagemService.getPersonagens().then(lista => { this.personagens = lista; });
  }

  private loadHabilidades() {
    this.habilidadeService.getHabilidades().then(lista => { this.listaHabilidades = lista});
  }

  addHabilidade() {
    const control = <FormArray>this.form.controls['habilidades'];
    control.push(this.initHabilidade());
  }

  deleteHabilidade(position: number) {
    const control = <FormArray>this.form.controls['habilidades'];
    control.removeAt(position);
  }

  editar(personagem: Personagem) {
    this.alert = new AlertMessage();
    this.form.patchValue(personagem);

    // deletar todas as habilidades (form control) do form
    this.form.get('habilidades').value.forEach((element: any) => {
      this.deleteHabilidade(element);
    });

    // adicionar/criar novo form control para cada habilidade e add no form
    if (personagem.habilidades) {
      personagem.habilidades.forEach(obj => {
        const formGroupHabilidades: FormGroup = this.initHabilidade();
        formGroupHabilidades.patchValue(obj);
        const formArray = <FormArray>this.form.get('habilidades');
        formArray.push(formGroupHabilidades);

      });
    }
  }

  deletar(codigoPersonagem: string) {
    this.personagemService.deletePersonagem(codigoPersonagem)
      .then(result => {
        this.addSuccessAlert('Personagem excluído.');
        this.reload();
      });
  }

  salvar() {
    if (this.form.get('codigo').value) {
      this.personagemService.patchPersonagem(this.form.value)
        .then(result => {
          this.addSuccessAlert('Personagem alterado.');
          this.ngOnInit();
        }).catch(error => {
          this.addErrorAlert(error);
        });
    } else {
      this.personagemService.postPersonagem(this.form.value)
        .then(result => {
          this.addSuccessAlert('Novo personagem salvo.');
          this.ngOnInit();
        }).catch(error => {
          this.addErrorAlert(error);
        });
    }
  }

  compare(h1: Habilidade, h2: Habilidade) {
    return h1.codigo === h2.codigo;
  }

}
