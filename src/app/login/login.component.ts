import { Component, OnInit, ViewChild } from '@angular/core';

import { LoginService } from './login.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public user: User = new User();

  constructor(public loginService: LoginService) { }

  doLogin(login: string, password: String) {
    console.log('doLogin');
    this.user.login = login;
    this.user.password = password;
    this.loginService.doLogin(this.user);
  }

}
