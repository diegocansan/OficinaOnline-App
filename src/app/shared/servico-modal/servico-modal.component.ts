import {Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import {DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {Servico} from '../../servicos/servico/servico.model'
import {ServicosService} from '../../servicos/servicos.service'

export interface CadServicoModalModel {
  title:string;
  message:string;
}

@Component({
  selector: 'cadServicoModal',
  templateUrl: './servico-modal.component.html'
})
export class CadServicoModalComponent extends DialogComponent<CadServicoModalModel, Servico> implements CadServicoModalModel, OnInit {
  title: string;
  message: string;
  servicoForm: FormGroup
  servico : Servico

  constructor(dialogService: DialogService,
              private servicosService: ServicosService,
              private formBuilder: FormBuilder) {
    super(dialogService);
  }

  ngOnInit() {
    this.servicoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', Validators.required),
      valor: this.formBuilder.control('', Validators.required)
    })
}

  confirm(servico: Servico) {
      this.servicosService.salvar(servico)
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
