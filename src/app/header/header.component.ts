import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oo-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  usuarioLogado(): boolean
  {
      return true;
  }

}
