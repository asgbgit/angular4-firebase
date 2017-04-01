import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Personagem } from './personagem.model';

@Injectable()
export class PersonagemService {

  private baseUrl = 'https://heroes-5b0f3.firebaseio.com';

  constructor(private http: Http) {}

  getPersonagens(): Observable<Personagem[]> {
    return this.http.get(`${this.baseUrl}/personagem.json`)
      .map((res: Response) => this.convert(res.json()))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postPersonagem(personagem: Personagem): Observable<Personagem> {
    return this.http.post(`${this.baseUrl}/personagem.json`, personagem)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  patchPersonagem(personagem: Personagem): Observable<Personagem> {
    const codigo = personagem.codigo;
    delete personagem.codigo;
    return this.http.patch(`${this.baseUrl}/personagem/${codigo}.json`, personagem)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deletePersonagem(codigoPersonagem: string): Observable<Personagem> {
    return this.http.delete(`${this.baseUrl}/personagem/${codigoPersonagem}.json`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private convert(parsedResponse: any) {
    if (parsedResponse) {
      return Object.keys(parsedResponse)
        .map(id => ({
          codigo: id,
          nome: parsedResponse[id].nome,
          companhia: parsedResponse[id].companhia,
          habilidades: parsedResponse[id].habilidades
        }));
    }
    return [];
  }

}
