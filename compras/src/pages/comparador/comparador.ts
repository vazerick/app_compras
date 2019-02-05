import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ComparadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comparador',
  templateUrl: 'comparador.html',
})
export class ComparadorPage {
  
  itens = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var cont = [1, 2, 3]
    cont.forEach(element => {      
      let item = {
        preco: 0,
        quantia: 0,
        unidades: 1,
        valor: 0,
        num: element
      }
      this.itens.push(item);
    });
    console.log(cont);
    console.log(this.itens);
  }

  // atualiza() {
  //   var preco = this.itens.preco;
  //   var quantia = this.itens.quantia;
  //   var unidades = this.itens.unidades;
  //   var valor = (preco/(quantia*unidades));
  //   this.itens.valor = valor;
  // }

  menor() {
    let valor = [];
    this.itens.forEach(element => {
      if (element.preco>0 && element.quantia>0 && element.unidades) {
        valor.push(
            element.preco/(element.quantia*element.unidades)
          );
      }
    });
    if (valor.length > 1){
      return Math.min(...valor);      
    } else {
      return 9999;
    }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComparadorPage');
  }

}
