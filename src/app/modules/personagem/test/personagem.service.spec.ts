import { Observable } from 'rxjs/Rx';

import { Habilidade } from './../../habilidade/habilidade.model';
import { Personagem } from './../personagem.model';
import { PersonagemService } from './../personagem.service';

describe('PersonagemService', () => {
  let http: any;
  let personagemService: PersonagemService;

  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get', 'post', 'patch', 'delete']);
    personagemService = new PersonagemService(http);
  });

  it('should be defined', () => {
    expect(personagemService).toBeDefined();
  });

  it('get should have been called', () => {
    http.get.and.callFake(() => Observable.of(
      [{
        codigo: '1',
        nome: 'Hulk',
        companhia: 'Marvel',
        habilidades: [ {habilidade: { codigo: '1', nome: 'Força'} } ]
      }]
    ));
    const personagens = personagemService.getPersonagens();
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  it('post should have been called', () => {
    http.post.and.callFake(() => Observable.of({}));
    const personagem: Personagem = {
        codigo: null,
        nome: 'Hulk',
        companhia: 'Marvel',
        habilidades: [ {habilidade: { codigo: '1', nome: 'Força'} } ]
      };
    personagemService.postPersonagem(personagem);
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  it('patch should have been called', () => {
    http.patch.and.callFake(() => Observable.of({}));
    const personagem: Personagem = {
        codigo: '1',
        nome: 'Hulk',
        companhia: 'Marvel',
        habilidades: [ {habilidade: { codigo: '1', nome: 'Força'} } ]
      };
    personagemService.patchPersonagem(personagem);
    expect(http.patch).toHaveBeenCalledTimes(1);
  });
  
  it('delete should have been called', () => {
    http.delete.and.callFake(() => Observable.of({}));
    const personagem: Personagem = {
        codigo: '1',
        nome: 'Hulk',
        companhia: 'Marvel',
        habilidades: [ {habilidade: { codigo: '1', nome: 'Força'} } ]
      };
    personagemService.deletePersonagem(personagem.codigo);
    expect(http.delete).toHaveBeenCalledTimes(1);
  });
});
