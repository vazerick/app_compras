import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { executeViewHooks } from '@angular/core/src/render3/instructions';
import { ListaPage } from '../lista/lista'
import { ComprasPage } from '../compras/compras';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    console.log("Construtor")
  }

  pag_lista(){
    this.navCtrl.push(ListaPage);
  }

  pag_compras(){
    this.navCtrl.push(ComprasPage);
  }

}
