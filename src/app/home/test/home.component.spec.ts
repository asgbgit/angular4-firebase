import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { HomeComponent } from './../home.component';
import { HomeModule } from './../home.module';

describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports: [HomeModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
