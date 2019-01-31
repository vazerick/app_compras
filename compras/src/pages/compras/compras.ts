import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ArquivoProvider } from '../../providers/arquivo/arquivo'
import { templateSourceUrl } from '@angular/compiler';


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
  gasto = 0;
  limite = 0;
  resta = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public arquivo: ArquivoProvider
    ) {            
      this.atualiza();
  }

  atualiza(){
    console.log("Atualiza");  // todo tornar as listas uma promise para poupar processamento
    this.gasto = 0;  
    this.lista = this.arquivo.getLista();
    this.lista_fila = this.arquivo.getLista().fila;        
    this.lista_comprado = this.arquivo.getLista().comprado;
    this.arquivo.storage.forEach( element => {
      this.gasto += Number(element.valor);    
    }).then(data => this.resta = this.limite - this.gasto);
    this.arquivo.getLimite().then( data => this.limite = data.valor);
  }
  
  promiseComprado() {
    return new Promise ( resolve => {      
      this.lista_comprado = this.arquivo.getLista().comprado;
      this.lista_comprado.forEach( element => {
        console.log("Valor", element.valor);
      } )
      resolve();
    })
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

  setLimite() {
    let prompt = this.alertCtrl.create({
      title: 'Definir Limite',
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
            // this.limite=data.Valor;
            this.arquivo.addLimite(data.Valor).then(data => this.atualiza());            
          }
        }
      ]
    });    
    prompt.present()
  }

  editar(item) {
    let prompt = this.alertCtrl.create({
      title: 'Editar '+item.nome,
      inputs: [{
        name: 'Valor',
        type: 'number',
        placeholder: item.valor,
      }],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Remover',
          handler: data => {
            this.arquivo.addValor(item, "").then( data => this.atualiza());            
          }
        },
        {
          text: 'Editar',
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
