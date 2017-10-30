import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Veiculo} from '../../veiculos/veiculo/veiculo.model'
import {VeiculosService} from '../../veiculos/veiculos.service'

export interface CadVeiculoModalModel {
  title:string;
  message:string;
}

@Component({
  selector: 'cadVeiculoModal',
  templateUrl: './veiculo-modal.component.html',
})
export class CadVeiculoModalComponent extends DialogComponent<CadVeiculoModalModel, Veiculo> implements CadVeiculoModalModel, OnInit {
  title: string;
  message: string;
  veiculoForm: FormGroup
  veiculo : Veiculo

  constructor(dialogService: DialogService,
              private veiculosService: VeiculosService,
              private formBuilder: FormBuilder) {
    super(dialogService);
  }

  ngOnInit() {
    this.veiculoForm = this.formBuilder.group({
      placa: this.formBuilder.control('', Validators.required),
      fabricante: this.formBuilder.control('', Validators.required),
      modelo: this.formBuilder.control('', Validators.required),
      ano: this.formBuilder.control('', Validators.required),
      cor: this.formBuilder.control('', Validators.required)
    })
}

  confirm(veiculo: Veiculo) {
      this.veiculosService.salvar(veiculo)
        .subscribe( (retorno) => {
          this.result = retorno
      })
      this.close();
  }
  cancel() {
    this.result = null;
    this.close();
  }
}
