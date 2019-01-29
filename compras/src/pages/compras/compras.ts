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

  lista = {
    comprado: [],
    fila: []
  };
  lista_comprado = [];
  lista_fila = [];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public arquivo: ArquivoProvider
    ) {
      // this.lista = this.arquivo.getLista();
      // this.lista_comprado = this.arquivo.getLista().comprado;
      // this.lista_fila = this.arquivo.getLista().fila;
      this.atualiza();          
  }

  atualiza(){
    console.log("Atualiza");
    this.lista = this.arquivo.getLista();
    this.lista_comprado = this.arquivo.getLista().comprado;    
    this.lista_fila = this.arquivo.getLista().fila;        
  }
  

  comprar(item) {
    let prompt = this.alertCtrl.create({
      title: 'Comprar '+item.nome,
      inputs: [{
        name: 'Valor',
        type: 'number',
        placeholder: '0'
      }],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Adicionar',
          handler: data => {                    
            this.arquivo.addValor(item, data.Valor).then( data => this.atualiza());            
          }
        }
      ]
    });    
    prompt.present().then( data => {
      console.log("Dados:", data);
    });        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }

}
