import { Component, OnInit, ViewChild } from '@angular/core';

import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public user: User = new User();

  constructor(public loginService: LoginService) { }

  doLogin(login: string, password: String) {
    this.user.login = login;
    this.user.password = password;
    this.loginService.doLogin(this.user);
  }

}
