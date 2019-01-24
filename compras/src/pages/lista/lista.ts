import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
      this.lista = this.arquivo.getLista();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPage');
  }

  add() {
    let prompt = this.alertCtrl.create({
      title: 'Novo item',
      inputs: [{
        name: 'Nome',
        placeholder: 'Item'
      }],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Adicionar',
          handler: data => {
            this.lista.push({
              nome: data.Nome, 
              valor: "",
            });
            this.arquivo.salva(this.lista);
            console.log(this.lista)
          }
        }
      ]
    });    
    prompt.present();
  }

  remove(item: string) {
    console.log(item)
    const index: number = this.lista.indexOf(item);
    if (index !== -1) {
        this.lista.splice(index, 1);
        this.arquivo.salva(this.lista);
    }    
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
