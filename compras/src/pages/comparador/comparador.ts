import {Component, Pipe, PipeTransform} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ComparadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Pipe({ name: 'pipePreco'}) /*todo transformar em um pipe universal*/
export class pipePreco implements PipeTransform{
  transform(val) {
    let decimais:number = 2;
    let separador:string = ".";
    let a:any = val.toString().split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
    let ans = ns.split('');
    let r = '';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    val = r;
    return val;
  }

}

@Component({
  selector: 'page-comparador',
  templateUrl: 'comparador.html',
})
export class ComparadorPage {
  
  itens = []

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public alertCtrl: AlertController,
    ) {
    let cont = [1, 2]
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
  }

  add(){
    this.itens.push({
      preco: 0,
      quantia: 0,
      unidades: 1,
      valor: 0,
      num: this.itens.length+1
    })
  }

  limpa(){
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
            this.itens = [];
            let cont = [1, 2];
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
        
          }
      }                
      ]
    })
    prompt.present();
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
