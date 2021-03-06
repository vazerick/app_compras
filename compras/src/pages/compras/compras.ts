import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ArquivoProvider } from '../../providers/arquivo/arquivo';
import { templateSourceUrl } from '@angular/compiler';
import { AdicionarPage } from '../../modal/adicionar/adicionar';
import { EditarPage } from '../../modal/editar/editar';
import { ComprarPage } from '../../modal/comprar/comprar';


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
  lista_fila = [];
  lista_comprado = [];
  gasto = 0;
  limite = 0;
  resta = 0;
  barra = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public arquivo: ArquivoProvider,
    public modalCtrl: ModalController
    ) {            
      this.atualiza();
      this.arquivo.getLista().then( data => this.lista = data.total);
  }

  atualiza(){
    console.log("Atualiza");  // todo tornar as listas uma promise para poupar processamento
    this.gasto = 0;  
    this.arquivo.getLista().then(  data => this.lista = data.total );
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

  add(lista) {
    let valor = false;
    if (lista=="carrinho"){
      valor = true;
    }
    let profileModal = this.modalCtrl.create(
      AdicionarPage,
      {valor: valor},
      {showBackdrop: false}
    );
    profileModal.present();
  
    profileModal.onDidDismiss(data => {  
      console.log(data);
      this.atualiza();
    });
  }

  editar(item, lista) {
    console.log("Editar ",lista,":");
    console.log(item);
    let valor = false;
    if (lista=="carrinho"){
      valor = true;
    }
    let profileModal = this.modalCtrl.create(
      EditarPage,
      {
        EditItem: item,
        valor: valor
      },      
      {showBackdrop: false}
    );
    profileModal.present();
  
    profileModal.onDidDismiss(data => {  
      console.log(data);
      this.atualiza();
    });
  }

  add_lista_old() {
    let lista: Array<any>
    this.arquivo.getLista().then( data => {
      lista = data.total;
      let prompt = this.alertCtrl.create({
        title: 'Novo item na lista',
        message: 'Nome e quantidade.',
        inputs: [
            {
              name: 'Nome',
              placeholder: 'Nome'
            },
            {
              name: 'Vezes',
              value: '1',
              type: 'number',
              min: '1'
            }
        ],
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Adicionar',
            handler: data => {
              if (data.Nome.length>0){
                this.arquivo.add({
                  nome: data.Nome,
                  vezes: data.Vezes,
                  valor: "",
                }).then ( data => this.atualiza());
              } else {
                let prompt2 = this.alertCtrl.create({
                  title: 'Erro',
                  message: 'Informação incompleta.',
                  buttons: [
                    {
                      text: 'Ok'
                    }
                  ]
                })
                prompt2.present();
              }                                     
            }
          }
        ]
      });    
      prompt.present();
    });    
  }  

  add_carrinho_old() {
    let lista: Array<any>
    this.arquivo.getLista().then( data => {
      lista = data.total;
      let prompt = this.alertCtrl.create({
        title: 'Novo item no carrinho',
        message: 'Nome, valor e quantidade.',
        inputs: [
            {
              name: 'Nome',
              placeholder: 'Nome'
            },
            {
              name: 'Valor',
              placeholder: 'Valor',
              type: 'number',
              min: '1'
            },
            {
              name: 'Vezes',
              value: '1',
              type: 'number',
              min: '1'
            }
        ],
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Adicionar',
            handler: data => {
              if ((data.Valor>0)&&(data.Nome.length>0)){
                this.arquivo.add({
                  nome: data.Nome,
                  vezes: data.Vezes,
                  valor: data.Valor,
                }).then ( data => this.atualiza());
              } else {
                let prompt2 = this.alertCtrl.create({
                  title: 'Erro',
                  message: 'Informação incompleta.',
                  buttons: [
                    {
                      text: 'Ok'
                    }
                  ]
                })
                prompt2.present();
              }              
            }
          }
        ]
      });    
      prompt.present();
    });    
  }  

  comprar(item) {
    let profileModal = this.modalCtrl.create(
      ComprarPage,
      {item: item},
      {showBackdrop: false}
    );
    profileModal.present();
  
    profileModal.onDidDismiss(data => {  
      console.log(data);
    });
  }
  
  comprar_old(item) {
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

  numero(item, soma) {
    let vezes = Number(item.vezes)+soma
    if (vezes > 0) {
      this.arquivo.editar(item, item.nome, item.valor, vezes).then( data => this.atualiza() );
    }    
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
            this.arquivo.editar(item, data.Nome, item.valor, data.Vezes).then(data => {
              this.lista_fila[this.lista_fila.indexOf(item)] = data;
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
          text: 'Editar',
          handler: data => {                    
            this.arquivo.editar(item, data.Nome, item.valor, data.Vezes).then( novo => {
              this.arquivo.addValor(novo, data.Valor).then(data => {
                this.lista_comprado[this.lista_comprado.indexOf(item)] = data;
              });              
            }); 
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

  seleciona(item) {
    item.select = ! item.select;
    this.lista.forEach(element => {
      if (element != item) {
        element.select = false;
      }
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprasPage');
  }

}
