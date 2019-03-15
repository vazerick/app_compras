import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {pipePreco} from '../../pipes/preco';
import {ArquivoProvider} from "../../providers/arquivo/arquivo";

/**
 * Generated class for the EditarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html',
})
export class EditarPage {

  valor: boolean;

  item = {
    nome: <string> null,
    valor: <number> null,
    vezes: <number> null
  };

  item_edit = {
    nome: <string> null,
    preco: <number> null,
    vezes: <number> null,
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    params: NavParams,
    public arquivo: ArquivoProvider,
    ) {
      this.item = params.get('EditItem');
      this.valor = params.get('valor');
      this.item_edit.nome = this.item.nome;
      this.item_edit.preco = this.item.valor;
      this.item_edit.vezes = this.item.vezes;
      console.log("item_edit:", this.item_edit);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPage');
  }

  numero(item, soma: number) {
    let vezes = Number(item.vezes)+soma;
    if (vezes > 0) {      
      item.vezes = vezes;
    }    
  }

  encerra() {
    console.log("Fecha")
    this.viewCtrl.dismiss(this.item);
  }

  editar() {
    console.log(this.item_edit);
    this.arquivo.editar(this.item, this.item_edit.nome, this.item_edit.preco, this.item_edit.vezes).then(data => {
      this.viewCtrl.dismiss(true);
    })
  }

}
