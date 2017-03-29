import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HabilidadeService } from './habilidade.service'
import { SuperComponent } from './../../common/resource/super-component';
import { AlertMessage } from './../../common/domain/alert-message.model';
import { Habilidade } from './habilidade.model';


@Component({
  selector: 'app-habilidade',
  templateUrl: './habilidade.component.html'
})
export class HabilidadeComponent extends SuperComponent implements OnInit {

  form: FormGroup;

  habilidades: Habilidade[];

  constructor(private formBuilder: FormBuilder,
              private habilidadeService: HabilidadeService) {
      super();
  }

  ngOnInit() {
    this.form = this.createForm();
    this.reload();
  }

  public createForm(): FormGroup {
    return this.formBuilder.group({
      codigo: [],
      nome: ['', Validators.required]
    });
  }

  public reload() {
    this.habilidadeService.getHabilidades().then(lista => { this.habilidades = lista; });
  }

  salvar() {
    console.log('salvar');
    if (this.form.get('codigo').value) {
      this.habilidadeService.patchHabilidade(this.form.value)
        .then(result => {
          this.addSuccessAlert("Habilidade alterada.");
          this.ngOnInit();
        }).catch(error => {
          this.addErrorAlert(error);
        });
    } else {
      console.log('postHabilidade');
      this.habilidadeService.postHabilidade(this.form.value)
        .then(result => {
          this.addSuccessAlert("Nova habilidade salva.");
          this.ngOnInit();
        }).catch(error => {
          this.addErrorAlert(error);
        })
    }
  }

  editar(habilidade: Habilidade) {
    this.alert = new AlertMessage();
    this.form.patchValue(habilidade);
  }

  deletar(codigoHabilidade: string) {
    this.habilidadeService.deleteHabilidade(codigoHabilidade)
      .then(result => {
        this.addSuccessAlert("Habilidade excluída.");
        this.reload();
      });
  }
}
