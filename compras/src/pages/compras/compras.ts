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

  lista_comprado = [];
  lista_fila = [];
  gasto = 0;
  limite = 0;
  resta = 0;
  barra = 0;

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
    this.arquivo.getLista().then( data => {      
      this.lista_comprado = data.comprado;
      this.lista_fila = data.fila;
    });
    this.arquivo.getGasto().then( data => {
      this.gasto = data;
      this.resta = this.limite - this.gasto;
      if (this.gasto < this.limite) {
        this.barra = (this.gasto/this.limite)*100;
      } else {
        this.barra = 100;
      }
    });
    this.arquivo.getLimite().then( data => this.limite = data.valor);
  }
  
  comprar(item) {
    let prompt = this.alertCtrl.create({
      title: 'Comprar '+item.nome,
      message: 'Valor e quantidade',
      inputs: [
          {
            name: 'Valor',
            type: 'number',
            placeholder: 'Valor'
          },
          {
            name: 'Vezes',
            type: 'number',
            placeholder: 'Quantidade',
            value: String(item.vezes),
            min: 1
          }
          ],
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
        placeholder: String(this.limite)
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

  editar_fila(item) {
    let prompt = this.alertCtrl.create({
      title: 'Editar '+item.nome,
      message: 'Nome e quantidade',
      inputs: [
        {
          name: 'Nome',
          value: item.nome,
        },        
        {
          name: 'Vezes',
          type: 'number',
          value: item.vezes,
          min: 1,
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },        
        {
          text: 'Editar',
          handler: data => {
            this.arquivo.editar(item, data.Nome, data.Vezes).then(data => {
              this.atualiza();
            });                                    
          }
        }
      ]
    });    
    prompt.present();        
  }

  editar_comprado(item) {
    let prompt = this.alertCtrl.create({
      title: 'Editar '+item.nome,
      message: 'Nome, preço e quantidade',
      inputs: [
        {
          name: 'Nome',
          value: item.nome,
        },        
        {
          name: 'Valor',
          type: 'number',
          value: item.valor,
        },
        {
          name: 'Vezes',
          type: 'number',
          value: item.vezes,
          min: 1,
        },
      ],
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
    prompt.present();        
  }

  remover(item) {
    let prompt = this.alertCtrl.create({
      title: 'Remover '+item.nome,
      message: 'Retornar '+item.nome+" da lista de compras?",      
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Remover',
          handler: data => {
            this.arquivo.addValor(item, "").then( data => this.atualiza());            
          }
        }
      ]
    });    
    prompt.present();        
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }

}
