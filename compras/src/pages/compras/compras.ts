import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ArquivoProvider } from '../../providers/arquivo/arquivo'


/**
 * Generated class for the ComprasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage {

  lista = [];
  lista_comprado = [];
  lista_fila = [];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public arquivo: ArquivoProvider
    ) {
      this.lista = this.arquivo.getLista();
      console.log(this.lista)
      this.atualiza();          
  }

  atualiza(){
    this.lista_comprado = [];
    this.lista_fila = [];
    console.log("Atualiza!", this.lista);
    this.lista.forEach( item =>{
      console.log("loop", item);
      if (item.valor == "") {
        console.log("Inicio do if Fila");
        console.log("Fila:", item)
        this.lista_fila.push({
          nome: item.nome, 
          valor: "",
        });        
        console.log("Lista fila:", this.lista_fila);        
        console.log("Fim do if Fila");
      } else {
        console.log("Comprado");
        this.lista_comprado.push({
          nome: item.nome,
          valor: item.valor
        });
      }
    });
    
  }

  foo(){
    this.atualiza();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }

}
