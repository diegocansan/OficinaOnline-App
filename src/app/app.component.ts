import {Component, OnInit} from "@angular/core"

@Component({
  selector: 'oo-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  content = 'Bem-vindo ao Oficina Online App!'

  constructor() { }

  ngOnInit() {
  }

}
