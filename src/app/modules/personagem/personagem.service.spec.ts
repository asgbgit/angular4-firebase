import { TestBed, inject } from '@angular/core/testing';

import { PersonagemService } from './personagem.service';

describe('PageOneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonagemService]
    });
  });

  it('should ...', inject([PersonagemService], (service: PersonagemService) => {
    expect(service).toBeTruthy();
  }));
});
