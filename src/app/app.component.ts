import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logout() {
    window.localStorage.removeItem('user');
    window.location.reload();
  }

  estaLogado() {
    return window.localStorage.getItem('user');
  }
}
