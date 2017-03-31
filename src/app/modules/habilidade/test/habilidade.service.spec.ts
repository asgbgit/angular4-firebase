import { Observable } from 'rxjs/Rx';

import { HabilidadeService } from './../habilidade.service';

describe('HabilidadeService', () => {

  let http: any;
  let habilidadeService: HabilidadeService;

  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get']);
    http.get.and.callFake(() => Observable.of([{ codigo: '1', nome: 'Força'}]));

    habilidadeService = new HabilidadeService(http);
  });

  it('should be defined', () => {
    expect(habilidadeService).toBeDefined();
  });

  it('get should have been called', () => {
    const habilidades = habilidadeService.getHabilidades();
    expect(http.get).toHaveBeenCalledTimes(1);
  });
});
