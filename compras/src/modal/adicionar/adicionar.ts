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
  
  teste: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    params: NavParams
    ) {
      
      this.teste = params.get('teste');
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarPage');
  }

  modal() {
    this.viewCtrl.dismiss({

    });
  }

}
