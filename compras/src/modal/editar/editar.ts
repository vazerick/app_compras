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

  item = {
    nome: <string> null,
    preco: <number> null,
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
      this.item_edit.nome = this.item.nome;
      this.item_edit.preco = this.item.preco;
      this.item_edit.vezes = this.item.vezes;
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
    this.arquivo.editar(this.item, this.item_edit.nome, this.item_edit.preco, this.item_edit.vezes).then(data => {
      this.viewCtrl.dismiss(true);
    })
  }

}
