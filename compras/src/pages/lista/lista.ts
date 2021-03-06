import { Component } from '@angular/core';
import { IonicPage, reorderArray, NavController, NavParams, AlertController, ModalController  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ArquivoProvider } from '../../providers/arquivo/arquivo'
import { AdicionarPage } from '../../modal/adicionar/adicionar'
import { EditarPage } from '../../modal/editar/editar';

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
    public arquivo: ArquivoProvider,
    public modalCtrl: ModalController
    ) {
      console.log("Arquivo:",this.arquivo.teste);
      this.arquivo.getLista().then( data => this.lista = data.total);
  }

  
adicionar() {
  let profileModal = this.modalCtrl.create(
    AdicionarPage,
    {valor: false},
    {showBackdrop: false}
  );
  profileModal.present();

  profileModal.onDidDismiss(data => {  
    console.log(data);
  });
}

editar(item) {
  let profileModal = this.modalCtrl.create(
    EditarPage,
    {
      EditItem: item,
    valor: false
    },
    {showBackdrop: false}
  );
  profileModal.present();

  profileModal.onDidDismiss(data => {  
    console.log(data);
  });
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
              this.arquivo.add({
                nome: data.Nome,
                valor: "",
                vezes: data.Vezes
              })
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

  editar_old(item) {    
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
              this.arquivo.editar(item, data.Nome, item.valor, data.Vezes).then(data => {
                this.lista[this.lista.indexOf(item)] = data;
              });                                    
            }
          }
        ]
      });
      prompt.present(); 
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
              this.arquivo.editar(item, data.Nome, item.valor, item.vezes).then(data => {
                this.arquivo.getLista().then( data => this.lista = data.total);
              }
              );                                    
            }
          }
        ]
      }); 
      prompt.present();
    };           
  }

  remove(item) {
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
            this.arquivo.remove(item);
            // const index: number = this.lista.indexOf(item);
            // if (index !== -1) {
            //     this.lista.splice(index, 1);
            //     this.arquivo.salva(this.lista);
            // }
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
                this.arquivo.limpar();
                this.arquivo.atualiza();
              }
          }
      ]
    })
    prompt.present();

  }

  reorder(ev) {
    this.arquivo.reordena(ev);
  }

  seleciona(item) {
    item.select = ! item.select;
    this.lista.forEach(element => {
      if (element != item) {
        element.select = false;
      }
    })
    console.log(this.lista);
  }

  

}
