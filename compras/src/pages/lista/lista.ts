import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Item } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ArquivoProvider } from '../../providers/arquivo/arquivo'

/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  lista = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public arquivo: ArquivoProvider
    ) {
      this.arquivo.getLista().then( data => this.lista = data.total);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

  add() {
    let prompt = this.alertCtrl.create({
      title: 'Novo item',
      message: 'Nome e quantidade',
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
              this.lista.push({
                nome: data.Nome, 
                valor: "",
                vezes: data.Vezes
              });
              this.arquivo.salva(this.lista);                         
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
  }

  editar(item) {
    if (item.valor == ""){
      let prompt = this.alertCtrl.create({
        title: 'Editar ' + item.nome,
        message: 'Nome e quantidade',
        inputs: [
            {
              name: 'Nome',
              placeholder: 'Nome',
              value: item.nome
            },
            {
              name: 'Vezes',
              value: item.vezes,
              type: 'number',
              min: '1'
            }
        ],
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Editar',
            handler: data => {
              this.arquivo.editar(item, data.Nome, data.Vezes).then(data => {
                this.arquivo.getLista().then( data => this.lista = data.total);
              });                                    
            }
          }
        ]
      }); 
    } else {
      let prompt = this.alertCtrl.create({
        title: 'Editar ' + item.nome,
        inputs: [
            {
              name: 'Nome',
              placeholder: 'Nome',
              value: item.nome
            }            
        ],
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Editar',
            handler: data => {
              this.arquivo.editar(item, data.Nome, item.vezes).then(data => {
                this.arquivo.getLista().then( data => this.lista = data.total);
              }
              );                                    
            }
          }
        ]
      }); 
    };       
    prompt.present();
  }

  remove(item: string) {
    let prompt = this.alertCtrl.create({
      title: 'Remover ' + item.nome,
      message: 'Deseja remover ' + item.nome + '?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Remover',
          handler: data => {
            const index: number = this.lista.indexOf(item);
            if (index !== -1) {
                this.lista.splice(index, 1);
                this.arquivo.salva(this.lista);
            }    
          }
        }
      ]
    });    
    prompt.present();
  }

  limpar(){
    let prompt = this.alertCtrl.create({
      title: 'LIMPAR',
      message: 'Deseja limpar toda a lista?',
      buttons: [
          {
              text: 'Não',
              handler: () => {
                  console.log('Cancel clicked');
              }
          },
          {
              text: 'Sim',
              handler: () => {
                this.lista = [];
                this.arquivo.limpar();
              }
          }
      ]
    })
    prompt.present();

  }

}
