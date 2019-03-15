import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {pipePreco} from '../../pipes/preco';
import {ArquivoProvider} from "../../providers/arquivo/arquivo";

/**
 * Generated class for the ComprarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comprar',
  templateUrl: 'comprar.html',
})
export class ComprarPage {

  item_edit = {
    nome: <string> null,
    preco: <number> null,
    vezes: <number> null,
  }

  item = {
    nome: <string> null,
    preco: <number> null,
    vezes: <number> null
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    params: NavParams,
    public arquivo: ArquivoProvider,
    ) {
      this.item = params.get('item');
      this.item_edit.preco = 0.0;                  
      this.item_edit.nome = this.item.nome;
      this.item_edit.vezes = this.item.vezes;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprarPage');
  }

  numero(item, soma: number) {
    if (soma == 0) {
      item.vezes = 1;
    } else {
      let vezes = Number(item.vezes)+soma;
      if (vezes > 0) {      
        item.vezes = vezes;
      }    
    }    
  }

  encerra() {
    console.log("Fecha")
    this.viewCtrl.dismiss(this.item);
  }

  comprar() {
    this.arquivo.editar(this.item, this.item_edit.nome, this.item_edit.preco, this.item_edit.vezes).then(data => {
      this.viewCtrl.dismiss(true);
    })    
  }

}
