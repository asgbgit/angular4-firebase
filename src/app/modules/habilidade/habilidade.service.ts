import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Habilidade } from './habilidade.model';

@Injectable()
export class HabilidadeService {

  private baseUrl = 'https://heroes-5b0f3.firebaseio.com';

  constructor(private http: Http) {}

  getHabilidades(): Observable<Habilidade[]> {
    return this.http.get(`${this.baseUrl}/habilidade.json`)
      .map((res: Response) => this.convert(res.json()))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postHabilidade(habilidade: Habilidade): Observable<Habilidade> {
    return this.http.post(`${this.baseUrl}/habilidade.json`, habilidade)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  patchHabilidade(habilidade: Habilidade): Observable<Habilidade> {
    const codigo = habilidade.codigo;
    return this.http.patch(`${this.baseUrl}/habilidade/${codigo}.json`, habilidade)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteHabilidade(codigoHabilidade: string): Observable<Habilidade> {
    return this.http.delete(`${this.baseUrl}/habilidade/${codigoHabilidade}.json`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private convert(parsedResponse: any) {
    if (parsedResponse) {
      return Object.keys(parsedResponse)
        .map(id => ({
          codigo: id,
          nome: parsedResponse[id].nome
        }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    }
    return [];
  }

}
