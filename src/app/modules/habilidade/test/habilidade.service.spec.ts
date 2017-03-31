import { TestBed, inject } from '@angular/core/testing';

import { HabilidadeService } from './../habilidade.service';

xdescribe('PageOneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HabilidadeService]
    });
  });

  it('should ...', inject([HabilidadeService], (service: HabilidadeService) => {
    expect(service).toBeTruthy();
  }));
});
