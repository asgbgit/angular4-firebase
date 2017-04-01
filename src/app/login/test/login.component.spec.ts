import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModule } from './../login.module';
import { LoginService } from './../login.service';
import { LoginComponent } from './../login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: any;

  beforeEach(async(() => {
    loginService = jasmine.createSpyObj('loginService', ['doLogin']);
    loginService.doLogin.and.callFake(() => {});

    TestBed.configureTestingModule({
      imports: [LoginModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LoginService, useValue: loginService }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login button should be defined', () => {
    const button = fixture.debugElement.query(By.css('#btnLogin')).nativeElement;
    expect(button).toBeDefined();
  });

});
