import { Observable } from 'rxjs/Rx';

import { Habilidade } from './../habilidade.model';
import { HabilidadeService } from './../habilidade.service';

describe('HabilidadeService', () => {

  let http: any;
  let habilidadeService: HabilidadeService;

  beforeEach(() => {
    http = jasmine.createSpyObj('http', ['get', 'post', 'patch', 'delete']);
    habilidadeService = new HabilidadeService(http);
  });

  it('should be defined', () => {
    expect(habilidadeService).toBeDefined();
  });

  it('get should have been called', () => {
    http.get.and.callFake(() => Observable.of([{ codigo: '1', nome: 'Força'}]));
    habilidadeService.getHabilidades();
    expect(http.get).toHaveBeenCalledTimes(1);
  });

  it('post should have been called', () => {
    http.post.and.callFake(() => Observable.of({}));
    const habilidade: Habilidade = { codigo: null, nome: 'Força'};
    habilidadeService.postHabilidade(habilidade);
    expect(http.post).toHaveBeenCalledTimes(1);
  });

  it('patch should have been called', () => {
    http.patch.and.callFake(() => Observable.of({}));
    const habilidade: Habilidade = { codigo: '1', nome: 'Força'};
    habilidadeService.patchHabilidade(habilidade);
    expect(http.patch).toHaveBeenCalledTimes(1);
  });
  
  it('delete should have been called', () => {
    http.delete.and.callFake(() => Observable.of({}));
    const habilidade: Habilidade = { codigo: '1', nome: 'Força'};
    habilidadeService.deleteHabilidade(habilidade.codigo);
    expect(http.delete).toHaveBeenCalledTimes(1);
  });
});
