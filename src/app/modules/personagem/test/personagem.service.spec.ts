import { Personagem } from './../personagem.model';
import { Observable } from 'rxjs/Rx';

import { PersonagemService } from './../personagem.service';

describe('PersonagemService', () => {
  let http: any;
  let personagemService: PersonagemService;

  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get']);
    http.get.and.callFake(() => Observable.of([
      {
        codigo: '1',
        nome: 'Hulk',
        companhia: 'Marvel',
        habilidades: [ { codigo: '1', nome: 'Força'}, { codigo: '2', nome: 'Imortalidade'} ]}
      ]
    ));

    personagemService = new PersonagemService(http);
  });

  it('should be defined', () => {
    expect(personagemService).toBeDefined();
  });

  it('get should have been called', () => {
    const personagens = personagemService.getPersonagens();
    expect(http.get).toHaveBeenCalledTimes(1);
  });
});
