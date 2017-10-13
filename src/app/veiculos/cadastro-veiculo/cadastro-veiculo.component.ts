import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {Router, ActivatedRoute} from '@angular/router'

import {Veiculo} from  '../veiculo/veiculo.model'
import {VeiculosService} from  '../veiculos.service'
import {NotificationService} from '../../shared/messages/notification.service'

@Component({
  selector: 'oo-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html'
})
export class CadastroVeiculoComponent implements OnInit {

  veiculoForm: FormGroup
  veiculo : Veiculo

  constructor(private veiculosService: VeiculosService,
              private notificationService: NotificationService,
              private router: Router, private route : ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.veiculoForm = this.formBuilder.group({
      placa: this.formBuilder.control('', Validators.required),
      fabricante: this.formBuilder.control('', Validators.required),
      modelo: this.formBuilder.control('', Validators.required),
      ano: this.formBuilder.control('', Validators.required),
      cor: this.formBuilder.control('', Validators.required)
    })

    let id = this.route.snapshot.paramMap.get("id")

    if(id)
      this.buscar(id)
  }

    buscar(id:string){
    this.veiculosService.byId(id)
      .subscribe( (retorno) => {
        this.veiculo = retorno
        this.veiculoForm.controls['placa'].setValue(this.veiculo.placa)
        this.veiculoForm.controls['fabricante'].setValue(this.veiculo.fabricante)
        this.veiculoForm.controls['modelo'].setValue(this.veiculo.modelo)
        this.veiculoForm.controls['ano'].setValue(this.veiculo.ano)
        this.veiculoForm.controls['cor'].setValue(this.veiculo.cor)
      })
    }

  btnSalvar(veiculo: Veiculo){
    if(this.veiculo)
      this.alterar(veiculo)
    else
      this.salvar(veiculo)
  }

  salvar(veiculo: Veiculo){
    this.veiculosService.salvar(veiculo)
      .subscribe( (retorno: string) => {
        this.router.navigate(['/veiculos'])
        this.notificationService.notify(`Veículo adicionado!`)
    })
  }

  alterar(veiculo: Veiculo){
    this.veiculo.placa = veiculo.placa
    this.veiculo.fabricante = veiculo.fabricante
    this.veiculo.modelo = veiculo.modelo
    this.veiculo.ano = veiculo.ano
    this.veiculo.cor = veiculo.cor

    this.veiculosService.alterar(this.veiculo)
      .subscribe( (retorno: boolean) => {
        this.router.navigate(['/veiculos'])
        this.notificationService.notify(`Veiculo alterado!`)
    })
  }
}
