import { Personagem } from './personagem.model';
import { Injectable } from '@angular/core';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonagemService {

  private baseUrl = 'https://heroes-5b0f3.firebaseio.com';

  constructor(private http: Http) { }

  getPersonagens() {
    return this.http.get(`${this.baseUrl}/personagem.json`)
      .toPromise()
      .then(response => this.convert(response.json()));
  }

  postPersonagem(personagem: Personagem) {
    return this.http.post(`${this.baseUrl}/personagem.json`, personagem)
      .toPromise()
      .then(response => response);
  }

  patchPersonagem(personagem: Personagem) {
    const codigo = personagem.codigo;
    delete personagem.codigo;
    return this.http.patch(`${this.baseUrl}/personagem/${codigo}.json`, personagem)
      .toPromise();
  }

  deletePersonagem(codigoPersonagem: string) {
    return this.http.delete(`${this.baseUrl}/personagem/${codigoPersonagem}.json`)
      .toPromise();
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
  }}
