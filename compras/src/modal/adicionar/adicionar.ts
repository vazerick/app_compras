import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {pipePreco} from '../../pipes/preco';
import {ArquivoProvider} from "../../providers/arquivo/arquivo";

/**
 * Generated class for the AdicionarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar',
  templateUrl: 'adicionar.html',
})
export class AdicionarPage {
  
  valor: boolean;
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
      this.valor = params.get('valor');
      this.item.preco = 0.0;
      this.item.vezes = 1;
      console.log("Valor:", params.get('valor'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarPage');
  }


  adicionar() {
    if (this.item.nome!=null && this.item.preco>0 && this.item.preco>0) {
        this.arquivo.adicionar(this.item).then(data => {
           this.viewCtrl.dismiss();
        });
    }
  }
}
