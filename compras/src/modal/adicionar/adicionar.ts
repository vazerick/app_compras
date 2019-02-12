import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AdicionarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar',
  templateUrl: 'adicionar.html',
})
export class AdicionarPage {
  
  valor: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    params: NavParams
    ) {
      this.valor = params.get('valor');
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarPage');
  }

  modal() {
    this.viewCtrl.dismiss({

    });
  }

}
