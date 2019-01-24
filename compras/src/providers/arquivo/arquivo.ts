import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from 'ionic-angular';

@Injectable()
export class ArquivoProvider {

  constructor(public storage: Storage) { 
  }

  salva(lista: Array<any>) {
    this.limpar();
    lista.forEach( (value: string, index: number) => {
      console.log(value, ": ", index)
      var chave: string;
      chave = index.toString();
      this.storage.set(chave , value);
    });
    
  }

  getLista() {
    // return "get Lista"
    var lista = [];
    console.log("Tamanho:", this.storage.length);
    console.log(this.storage);
    this.storage.forEach(element => {
      console.log("Elemento:", element)
      lista.push(element)
    });
    return lista;
  }

  limpar(){
    this.storage.clear();
  }

}
